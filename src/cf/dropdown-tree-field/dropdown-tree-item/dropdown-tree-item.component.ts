import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit
}                               from "@angular/core";
import { Subscription }         from "rxjs";

import { DropdownTreeService }  from "../dropdown-tree.service";
import { DropdownTreeState }    from "../dropdown-tree-state.model";
import { TreeNode }             from "../tree-node.model";

@Component({
    selector: "cf-dropdown-tree-item",
    templateUrl: "dropdown-tree-item.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownTreeItemComponent implements OnInit, OnDestroy {
    @Input() idPrefix: string;
    @Input() node: TreeNode;

    id: string;
    treeItemClasses: string[];
    isSelected: boolean;
    isExpanded: boolean;
    showChildren: boolean;

    private stateSubscription: Subscription;

    constructor(private service: DropdownTreeService) {
    }

    ngOnInit() {
        this.id = this.idPrefix + "-" + this.node.id.toString();
        this.stateSubscription = this.service.stateObservable.subscribe(this.onStateChange.bind(this));
    }

    ngOnDestroy() {
        if(this.stateSubscription != null) {
            this.stateSubscription.unsubscribe();
        }
    }

    private onStateChange(state: DropdownTreeState) {
        this.treeItemClasses = [];

        if(this.node.children != null && this.node.children.length > 0) {
            this.treeItemClasses.push("tree--has-children");
            this.isExpanded = state.expandedNodes.has(this.node);
            this.showChildren = this.isExpanded;

            if(this.isExpanded) {
                this.treeItemClasses.push("tree--expanded");
            } else {
                this.treeItemClasses.push("tree--collapsed");
            }
        } else {
            this.treeItemClasses.push("tree--no-children");
            this.isExpanded = undefined;
            this.showChildren = false;
        }

        if(state.highlightedNode === this.node) {
            this.treeItemClasses.push("tree--highlighted");
        }

        if(state.selectedNode === this.node) {
            this.treeItemClasses.push("tree--selected");
            this.isSelected = true;
        } else {
            this.isSelected = false;
        }
    }

    onExpanderClick() {
        this.service.toggleNodeExpansion(this.node);
    }

    onNodeClick() {
        this.service.selectNode(this.node);
    }

    onNodeMouseEnter() {
        this.service.highlightNode(this.node);
    }
}
