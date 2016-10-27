import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';
import {
    Observable,
    BehaviorSubject
}                       from 'rxjs';

import { Config }       from '../../shared';
import { TreeNode }     from 'ng2-cbp-cf';

@Injectable()
export class DropdownTreeDemoService {
    private _data: BehaviorSubject<TreeNode[]>;
    private _observable: Observable<TreeNode[]>;
    private _url: string;

    constructor(private _http: Http, private _config: Config) {
        this._data = new BehaviorSubject<TreeNode[]>([]);
        this._observable = this._data.asObservable();
        this._url = _config.apiUrl + _config.treeNodeContext;
    }

    get treeNodesObservable(): Observable<TreeNode[]> {
        return this._observable;
    }

    refreshTreeNodes() {
        this._http.get(this._url).subscribe(respData => {
            this._data.next(respData.json().data);
        });
    }
}
