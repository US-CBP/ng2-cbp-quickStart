import {
    Component,
    TemplateRef,
    ViewChild,
}                                   from '@angular/core';
import { MdDialog }                 from '@angular/material';
import { Observable }               from 'rxjs';

import { TreeNode }                 from 'ng2-cbp-cf';

import { DropdownTreeDemoService }  from './dropdown-tree-demo.service';

@Component({
    templateUrl: 'dropdown-tree-demo.component.html',
})
export class DropdownTreeDemoComponent {
    treeNodeObservable: Observable<TreeNode[]>;
    demo1SelectedNode: TreeNode = null;
    demo2SelectedNode: TreeNode = null;
    demo3SelectedNode: TreeNode = null;

    @ViewChild('dialog') dialogTemplate: TemplateRef<any>;

    constructor(service: DropdownTreeDemoService, private _dialog: MdDialog) {
        this.treeNodeObservable = service.treeNodesObservable;
        service.refreshTreeNodes();
    }

    openDialog(): void {
        this._dialog.open(this.dialogTemplate, {
            width: '400px',
        });
    }
}
