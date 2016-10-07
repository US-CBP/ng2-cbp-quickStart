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

    isDropdownOpen: boolean = false;
    containerClasses: string[];
    defaultNode: TreeNode;
    selectedText: string;

    private stateSubscription: Subscription;

    constructor(private service: DropdownTreeService) {
    }

    ngOnInit() {
        this.defaultNode = this.initializeDefaultNode();

        let expandedNodes = new Set<TreeNode>();
        if(this.selectedNode != null) {
            this.addExpandedNodesToNodeFromArray(this.selectedNode, this.nodes, expandedNodes);
            this.service.setState(null, this.selectedNode, expandedNodes);
        } else {
            this.service.setState(null, this.defaultNode, expandedNodes);
        }

        this.stateSubscription = this.service.stateObservable.subscribe(this.onStateChange.bind(this));
    }

    ngOnChanges(changes: any) {
        if(changes.defaultLabel || changes.selectedNode) {
            this.defaultNode = this.initializeDefaultNode();
        }

        this.service.selectNode(this.selectedNode == null ? this.defaultNode : this.selectedNode);
    }

    ngOnDestroy() {
        if(this.stateSubscription != null) {
            this.stateSubscription.unsubscribe();
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

    private initializeDefaultNode() {
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
}

function createUniqueId() {
    return "dropdown-tree-field-" + nextId++;
}
