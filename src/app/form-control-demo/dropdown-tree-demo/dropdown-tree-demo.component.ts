import { Component }                from '@angular/core';
import { Observable }               from 'rxjs';

import { TreeNode }                 from 'ng2-cbp-cf';

import { DropdownTreeDemoService }  from './dropdown-tree-demo.service';

@Component({
    templateUrl: 'dropdown-tree-demo.component.html'
})
export class DropdownTreeDemoComponent {
    treeNodeObservable: Observable<TreeNode[]>;
    demo1SelectedNode: TreeNode = null;
    demo2SelectedNode: TreeNode = null;

    constructor(private _service: DropdownTreeDemoService) {
        this.treeNodeObservable = _service.treeNodesObservable;
        _service.refreshTreeNodes();
    }

    demo1NodeSelected(node: TreeNode) {
        this.demo1SelectedNode = node;
    }

    demo2NodeSelected(node: TreeNode) {
        this.demo2SelectedNode = node;
    }
}
