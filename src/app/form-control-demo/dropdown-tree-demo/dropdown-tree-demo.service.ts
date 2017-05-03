import { Injectable }       from '@angular/core';
import {
    BehaviorSubject,
    Observable,
}                           from 'rxjs';

import { TreeNode }         from 'ng2-cbp-cf';

import { MockServerService }    from '../../shared';

@Injectable()
export class DropdownTreeDemoService {
    private _data: BehaviorSubject<TreeNode[]>;
    private _observable: Observable<TreeNode[]>;

    constructor(private _serverService: MockServerService) {
        this._data = new BehaviorSubject<TreeNode[]>([]);
        this._observable = this._data.asObservable();
    }

    get treeNodesObservable(): Observable<TreeNode[]> {
        return this._observable;
    }

    refreshTreeNodes(): void {
        this._data.next(this._serverService.getTreeNodeData().data);
    }
}
