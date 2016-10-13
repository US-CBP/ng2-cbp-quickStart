import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
}                               from "@angular/core";
import { Subscription }         from "rxjs";

import { DropdownTreeService }  from "./dropdown-tree.service";
import { DropdownTreeState }    from "./dropdown-tree-state.model";
import { TreeNode }             from "./tree-node.model";

let nextId = 1;

@Component({
    selector: "cf-dropdown-tree-field",
    templateUrl: "dropdown-tree-field.component.html",
    styleUrls: ["dropdown-tree-field.component.scss"],
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

    @ViewChild("dropdownContainer") dropdownContainerElement: ElementRef;
    @ViewChild("combobox") comboboxElement: ElementRef;

    treeId: string;
    treeItemIdPrefix: string;
    isDropdownOpen: boolean = false;
    containerClasses: string[] = [];
    ariaOwnsId: string = undefined;
    ariaActiveDescendentId: string = undefined;
    defaultNode: TreeNode;
    selectedText: string;
    visibleNodes: TreeNode[];

    dropdownLeft: number;
    dropdownTop: number;
    dropdownWidth: number;

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
        this.initializeNodes();

        if(this.selectedNode != null) {
            this.selectedText = this.calculateSelectedText(this.selectedNode);
        } else {
            this.selectedText = this.calculateSelectedText(this.defaultNode);
        }

        this.stateSubscription = this.service.stateObservable.subscribe(this.onStateChange.bind(this));
    }

    ngOnChanges(changes: any) {
        if(changes.nodes) {
            this.initializeNodes();
        }

        this.defaultNode = this.initializeDefaultNode();

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

    onComboboxKeydown($event: KeyboardEvent) {
        if(!this.isDropdownOpen) {
            if(this.isKey($event, "ArrowDown", true)) {
                this.openDropdown();

                $event.stopPropagation();
                $event.preventDefault();
            }
        } else {
            if(this.isKey($event, "ArrowUp", true) || this.isKey($event, "Escape")) {
                this.closeDropdown();

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "ArrowUp")) {
                let previousNode = this.previousVisibleNode();
                if(previousNode != null) {
                    this.service.highlightNode(previousNode);
                    this.service.selectNode(previousNode);
                }

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "ArrowUp", false, true)) {
                let previousNode = this.previousVisibleNode();
                if(previousNode != null) {
                    this.service.highlightNode(previousNode);
                }

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "ArrowDown")) {
                let nextNode = this.nextVisibleNode();
                if(nextNode != null) {
                    this.service.highlightNode(nextNode);
                    this.service.selectNode(nextNode);
                }

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "ArrowDown", false, true)) {
                let nextNode = this.nextVisibleNode();
                if(nextNode != null) {
                    this.service.highlightNode(nextNode);
                }

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "ArrowLeft")) {
                let highlightedNode = this.service.currentState().highlightedNode;
                if(this.service.isNodeExpanded(highlightedNode)) {
                    this.service.collapseNode(highlightedNode);
                } else {
                    let parentNode = this.parentMap.get(highlightedNode);
                    if(parentNode != null) {
                        this.service.highlightNode(parentNode);
                        this.service.selectNode(parentNode);
                    }
                }

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "ArrowRight")) {
                let highlightedNode = this.service.currentState().highlightedNode;
                if(this.service.isNodeExpanded(highlightedNode)) {
                    this.service.highlightNode(highlightedNode.children[0]);
                    this.service.selectNode(highlightedNode.children[0]);
                } else {
                    this.service.expandNode(highlightedNode);
                }

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "Home")) {
                this.service.highlightNode(this.visibleNodes[0]);
                this.service.selectNode(this.visibleNodes[0]);

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "Home", false, true)) {
                this.service.highlightNode(this.visibleNodes[0]);

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "End")) {
                this.service.highlightNode(this.visibleNodes[this.visibleNodes.length - 1]);
                this.service.selectNode(this.visibleNodes[this.visibleNodes.length - 1]);

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, "End", false, true)) {
                this.service.highlightNode(this.visibleNodes[this.visibleNodes.length - 1]);

                $event.stopPropagation();
                $event.preventDefault();
            } else if(this.isKey($event, " ") || this.isKey($event, " ", false, true)) {
                let highlightedNode = this.service.currentState().highlightedNode;
                this.service.selectNode(highlightedNode);
            }
        }
    }

    onLabelClick($event: MouseEvent) {
        this.comboboxElement.nativeElement.focus();

        $event.preventDefault();
        $event.stopPropagation();
    }

    onTreeClick($event: MouseEvent) {
        this.comboboxElement.nativeElement.focus();

        if((<Element>$event.target).classList.contains("text")) {
            this.closeDropdown();
        }

        $event.preventDefault();
        $event.stopPropagation();
    }

    private isKey($event: KeyboardEvent, key: string, altKey: boolean = false, ctrlKey: boolean = false): boolean {
        return $event.key === key &&
            $event.altKey === altKey &&
            $event.ctrlKey === ctrlKey &&
            $event.shiftKey === false &&
            $event.metaKey === false;
    }

    private initializeNodes() {
        this.initializeMaps();

        let expandedNodes = new Set<TreeNode>();
        if(this.selectedNode != null) {
            this.expandNodesToNode(this.selectedNode, expandedNodes);
            this.service.setState(this.isDropdownOpen ? this.selectedNode : null, this.selectedNode, expandedNodes);
        } else {
            this.service.setState(this.isDropdownOpen ? this.defaultNode : null, this.defaultNode, expandedNodes);
        }

        this.resetVisibleNodes();
    }

    private previousVisibleNode(): TreeNode {
        let highlightedNode = this.service.currentState().highlightedNode;
        let highlightedNodeIndex = this.visibleNodes.indexOf(highlightedNode);
        return (highlightedNodeIndex > 0) ? this.visibleNodes[highlightedNodeIndex - 1] : null;
    }

    private nextVisibleNode(): TreeNode {
        let highlightedNode = this.service.currentState().highlightedNode;
        let highlightedNodeIndex = this.visibleNodes.indexOf(highlightedNode);
        return (highlightedNodeIndex < this.visibleNodes.length - 1) ? this.visibleNodes[highlightedNodeIndex + 1] : null;
    }

    private openDropdown() {
        this.setDropdownPosition();

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
        this.resetVisibleNodes();
    }

    private expandNodesToNode(nodeToFind: TreeNode, expandedNodes: Set<TreeNode>) {
        let parentNode = this.parentMap.get(nodeToFind);
        while(parentNode != null) {
            expandedNodes.add(parentNode);
            parentNode = this.parentMap.get(parentNode);
        }
    }

    private initializeDefaultNode(): TreeNode {
        if(this.defaultLabel != null) {
            return (this.defaultNode != null && this.defaultNode.text === this.defaultLabel) ? this.defaultNode : this.createDefaultNode(this.defaultLabel);
        } else if(this.selectedNode == null) {
            return (this.defaultNode != null && this.defaultNode.text === "") ? this.defaultNode : this.createDefaultNode("");
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
                this.visibleNodes.push(this.defaultNode);
            }
            this.nodes.forEach(node => this.processNodeForVisible(node));
        } else {
            this.visibleNodes = null;
        }
    }

    private setDropdownPosition() {
        let rect = <ClientRect>this.dropdownContainerElement.nativeElement.getBoundingClientRect();
        this.dropdownLeft = rect.left;
        this.dropdownTop = rect.bottom;
        this.dropdownWidth = rect.width;
    }
}

function createUniqueId() {
    return "dropdown-tree-field-" + nextId++;
}
