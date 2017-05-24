import {
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
}                                   from '@angular/core';
import { MdDialog }                 from '@angular/material';
import {
    ToolbarService,
    TreeNode,
}                                   from 'ng2-cbp-cf';
import { Observable }               from 'rxjs';

import { DropdownTreeDemoService }  from './dropdown-tree-demo.service';

@Component({
    templateUrl: 'dropdown-tree-demo.component.html',
})
export class DropdownTreeDemoComponent implements OnInit {
    treeNodeObservable: Observable<TreeNode[]>;
    demo1SelectedNode: TreeNode = null;
    demo2SelectedNode: TreeNode = null;
    demo3SelectedNode: TreeNode = null;

    @ViewChild('dialog') dialogTemplate: TemplateRef<any>;

    constructor(
        private _dialog: MdDialog,
        private _toolbarService: ToolbarService,
        service: DropdownTreeDemoService) {

        this.treeNodeObservable = service.treeNodesObservable;
        service.refreshTreeNodes();
    }

    ngOnInit(): void {
        this._toolbarService.setTitle('Dropdown tree');
    }

    openDialog(): void {
        this._dialog.open(this.dialogTemplate, {
            width: '400px',
        });
    }
}
