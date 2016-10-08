import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output
}                               from "@angular/core";
import { Subscription }         from "rxjs";

import { DropdownTreeService }  from "./dropdown-tree.service";
import { DropdownTreeState }    from "./dropdown-tree-state.model";
import { TreeNode } from "./tree-node.model";

let nextId = 1;

@Component({
    selector: "cf-dropdown-tree-field",
    templateUrl: "dropdown-tree-field.component.html",
    providers: [
        DropdownTreeService
    ]
})
export class DropdownTreeFieldComponent implements OnInit, OnChanges, OnDestroy {
    @Input() id: string = createUniqueId();
    @Input() label: string;
    @Input() defaultLabel: string;
    @Input() showFullSelectedPath: boolean = false;
    @Input() selectedNode: TreeNode;
    @Input() nodes: TreeNode[];
    @Output() nodeSelected = new EventEmitter<TreeNode>();

    treeId: string;
    treeItemIdPrefix: string;
    isDropdownOpen: boolean = false;
    containerClasses: string[] = [];
    ariaOwnsId: string = undefined;
    ariaActiveDescendentId: string = undefined;
    defaultNode: TreeNode;
    selectedText: string;
    visibleNodes: TreeNode[];

    static readonly focusClass = "dt--selection-focus";
    static readonly openClass = "dt--selection-open";

    private stateSubscription: Subscription;
    private parentMap: Map<TreeNode, TreeNode>;

    constructor(private service: DropdownTreeService) {
    }

    ngOnInit() {
        this.treeId = `${this.id}-tree`;
        this.treeItemIdPrefix = this.treeId + "-";
        this.defaultNode = this.initializeDefaultNode();
        this.initializeMaps();

        let expandedNodes = new Set<TreeNode>();
        if(this.selectedNode != null) {
            this.addExpandedNodesToNodeFromArray(this.selectedNode, this.nodes, expandedNodes);
            this.service.setState(null, this.selectedNode, expandedNodes);
            this.selectedText = this.calculateSelectedText(this.selectedNode);
        } else {
            this.service.setState(null, this.defaultNode, expandedNodes);
            this.selectedText = this.calculateSelectedText(this.defaultNode);
        }

        this.stateSubscription = this.service.stateObservable.subscribe(this.onStateChange.bind(this));
    }

    ngOnChanges(changes: any) {
        if(changes.defaultLabel || changes.selectedNode) {
            this.defaultNode = this.initializeDefaultNode();
        }

        let localSelectedNode = this.selectedNode == null ? this.defaultNode : this.selectedNode;
        this.service.selectNode(localSelectedNode);
        this.selectedText = this.calculateSelectedText(localSelectedNode);
    }

    ngOnDestroy() {
        if(this.stateSubscription != null) {
            this.stateSubscription.unsubscribe();
        }
    }

    onComboboxFocus() {
        if(this.containerClasses.indexOf(DropdownTreeFieldComponent.focusClass) === -1) {
            this.containerClasses.push(DropdownTreeFieldComponent.focusClass);
        }
    }

    onComboboxBlur() {
        let index = this.containerClasses.indexOf(DropdownTreeFieldComponent.focusClass);
        if(index !== -1) {
            this.containerClasses.splice(index, 1);
        }
    }

    onComboboxClick() {
        this.containerClasses = [DropdownTreeFieldComponent.focusClass];
        if(this.isDropdownOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    onComboboxKeypress($event: KeyboardEvent) {
        if($event.altKey || $event.ctrlKey || $event.metaKey || $event.shiftKey) {
            return;
        }
    }

    private openDropdown() {
        this.isDropdownOpen = true;
        this.resetVisibleNodes();

        var highlightedNode = this.calculateHighlightedOnOpen();
        this.service.highlightNode(highlightedNode);

        this.containerClasses.push(DropdownTreeFieldComponent.openClass);
        this.ariaOwnsId = this.treeId;
        this.ariaActiveDescendentId = this.service.createTreeItemId(this.treeItemIdPrefix, highlightedNode);
    }

    private closeDropdown() {
        this.isDropdownOpen = false;
        this.resetVisibleNodes();
        this.service.highlightNode(null);

        this.ariaOwnsId = undefined;
        this.ariaActiveDescendentId = undefined;
    }

    private calculateHighlightedOnOpen(): TreeNode {
        if(this.visibleNodes.indexOf(this.selectedNode) === -1) {
            return this.defaultNode == null ? this.nodes[0] : this.defaultNode;
        } else {
            return this.selectedNode;
        }
    }

    private onStateChange(state: DropdownTreeState) {
        if(this.selectedNode !== state.selectedNode && !(this.selectedNode == null && state.selectedNode === this.defaultNode)) {
            this.nodeSelected.next(state.selectedNode === this.defaultNode ? null : state.selectedNode);
        }
    }

    private addExpandedNodesToNodeFromNode(nodeToFind: TreeNode, currentNode: TreeNode, expandedNodes: Set<TreeNode>): boolean {
        if(nodeToFind === currentNode) {
            return true;
        }

        let found = this.addExpandedNodesToNodeFromArray(nodeToFind, currentNode.children, expandedNodes);
        if(found) {
            expandedNodes.add(currentNode);
        }

        return found;
    }

    private addExpandedNodesToNodeFromArray(nodeToFind: TreeNode, nodes: TreeNode[], expandedNodes: Set<TreeNode>): boolean {
        let found = false;

        if(nodes != null) {
            for(var i = 0; !found && i < nodes.length; i++) {
                found = this.addExpandedNodesToNodeFromNode(nodeToFind, nodes[i], expandedNodes);
            }
        }

        return found;
    }

    private initializeDefaultNode(): TreeNode {
        if(this.defaultLabel != null) {
            return this.createDefaultNode(this.defaultLabel);
        } else if(this.selectedNode == null) {
            return this.createDefaultNode("");
        } else {
            return null;
        }
    }

    private createDefaultNode(text: string): TreeNode {
        return {
            id: "-default-node",
            text: text,
            children: []
        };
    }

    private buildFullSelectedPathText(currentNode: TreeNode): string {
        if(currentNode == null) {
            return "";
        }

        let parent = this.parentMap.get(currentNode);
        return parent == null ? currentNode.text : `${this.buildFullSelectedPathText(parent)} / ${currentNode.text}`;
    }

    private calculateSelectedText(selectedNode: TreeNode): string {
        return this.showFullSelectedPath ? this.buildFullSelectedPathText(selectedNode) : selectedNode.text;
    }

    private processNodeForMaps(currentNode: TreeNode, parentNode: TreeNode) {
        this.parentMap.set(currentNode, parentNode);

        if(currentNode.children != null) {
            currentNode.children.forEach(node => this.processNodeForMaps(node, currentNode));
        }
    }

    private initializeMaps() {
        this.parentMap = new Map<TreeNode, TreeNode>();

        this.nodes.forEach(node => this.processNodeForMaps(node, null));
    }

    private processNodeForVisible(currentNode: TreeNode) {
        this.visibleNodes.push(currentNode);
        if(currentNode.children != null && currentNode.children.length > 0 && this.service.isNodeExpanded(currentNode)) {
            currentNode.children.forEach(node => this.processNodeForVisible(node));
        }
    }

    private resetVisibleNodes() {
        if(this.isDropdownOpen) {
            this.visibleNodes = [];
            if(this.defaultNode != null) {
                this.visibleNodes.push();
            }
            this.nodes.forEach(node => this.processNodeForVisible(node));
        } else {
            this.visibleNodes = null;
        }
    }
}

function createUniqueId() {
    return "dropdown-tree-field-" + nextId++;
}
