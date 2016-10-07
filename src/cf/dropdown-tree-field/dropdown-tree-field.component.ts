import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
}                               from "@angular/core";
import { Subscription }         from "rxjs";

import { DropdownTreeService }  from "./dropdown-tree.service";
import { DropdownTreeState }    from "./dropdown-tree-state.model";
import { TreeNode }             from "./tree-node.model";

@Component({
    selector: "cf-dropdown-tree-field",
    templateUrl: "dropdown-tree-field.component.html",
    providers: [
        DropdownTreeService
    ]
})
export class DropdownTreeFieldComponent implements OnInit, OnDestroy {
    @Input() id: string;
    @Input() label: string;
    @Input() showFullSelectedPath: boolean;
    @Input() nodes: TreeNode[];

    private stateSubscription: Subscription;

    constructor(private service: DropdownTreeService) {
    }

    ngOnInit() {
        this.stateSubscription = this.service.stateObservable.subscribe(this.onStateChange.bind(this));
    }

    ngOnDestroy() {
        if(this.stateSubscription != null) {
            this.stateSubscription.unsubscribe();
        }
    }

    private onStateChange(state: DropdownTreeState) {
    }
}
