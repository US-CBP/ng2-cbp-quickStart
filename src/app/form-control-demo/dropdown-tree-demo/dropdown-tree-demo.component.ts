import {
    Component,
    TemplateRef,
    ViewChild,
}                                   from '@angular/core';
import { MatDialog }                from '@angular/material';
import { TreeNode }                 from 'ng2-cbp-cf/src/dropdown-tree';
import { ToolbarService }           from 'ng2-cbp-cf/src/toolbar';
import { Observable }               from 'rxjs';

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

    constructor(
        private _dialog: MatDialog,
        private _toolbarService: ToolbarService,
        service: DropdownTreeDemoService) {

        this.treeNodeObservable = service.treeNodesObservable;
        service.refreshTreeNodes();

        this._toolbarService.setTitle('Dropdown tree');
    }

    openDialog(): void {
        this._dialog.open(this.dialogTemplate, {
            width: '400px',
        });
    }
}
