import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { DropdownTreeState } from "./dropdown-tree-state.model";
import { TreeNode } from "./tree-node.model";

@Injectable()
export class DropdownTreeService {
    private _stateObservable: Observable<DropdownTreeState>;
    private stateBehavior: BehaviorSubject<DropdownTreeState>;
    private state: DropdownTreeState;

    constructor() {
        this.state = {
            highlightedNode: null,
            selectedNode: null,
            expandedNodes: new Set<TreeNode>()
        };
        this.stateBehavior = new BehaviorSubject<DropdownTreeState>(this.state);
        this._stateObservable = this.stateBehavior.asObservable();
    }

    get stateObservable(): Observable<DropdownTreeState> {
        return this._stateObservable;
    }

    setState(highlightedNode: TreeNode, selectedNode: TreeNode, expandedNodes: Set<TreeNode>) {
        this.state = {
            highlightedNode,
            selectedNode,
            expandedNodes
        };
        this.stateBehavior.next(this.state);
    }

    highlightNode(node: TreeNode) {
        if(node !== this.state.highlightedNode) {
            this.setState(node, this.state.selectedNode, this.state.expandedNodes);
        }
    }

    selectNode(node: TreeNode) {
        if(node !== this.state.selectedNode) {
            this.setState(this.state.highlightedNode, node, this.state.expandedNodes);
        }
    }

    expandNode(node: TreeNode) {
        if(node.children != null && node.children.length > 0 && !this.state.expandedNodes.has(node)) {
            let expandedNodes = new Set<TreeNode>(this.state.expandedNodes);
            expandedNodes.add(node);

            this.setState(this.state.highlightedNode, this.state.selectedNode, expandedNodes);
        }
    }

    collapseNode(node: TreeNode) {
        if(node.children != null && node.children.length > 0 && this.state.expandedNodes.has(node)) {
            let expandedNodes = new Set<TreeNode>(this.state.expandedNodes);
            expandedNodes.delete(node);

            this.setState(this.state.highlightedNode, this.state.selectedNode, expandedNodes);
        }
    }

    toggleNodeExpansion(node: TreeNode) {
        if(node.children != null && node.children.length > 0) {
            if(this.state.expandedNodes.has(node)) {
                this.collapseNode(node);
            } else {
                this.expandNode(node);
            }
        }
    }

    createTreeItemId(prefix: string, node: TreeNode): string {
        return prefix + node.id.toString();
    }

    isNodeExpanded(node: TreeNode): boolean {
        return node.children != null && node.children.length > 0 && this.state.expandedNodes.has(node);
    }
}
