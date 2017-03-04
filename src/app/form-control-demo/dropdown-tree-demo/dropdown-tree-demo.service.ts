import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';
import {
    BehaviorSubject,
    Observable,
}                       from 'rxjs';

import { TreeNode }     from 'ng2-cbp-cf';

import { Config }       from '../../shared';

@Injectable()
export class DropdownTreeDemoService {
    private _data: BehaviorSubject<TreeNode[]>;
    private _observable: Observable<TreeNode[]>;
    private _url: string;

    constructor(private _http: Http, config: Config) {
        this._data = new BehaviorSubject<TreeNode[]>([]);
        this._observable = this._data.asObservable();
        this._url = config.apiUrl + config.treeNodeContext;
    }

    get treeNodesObservable(): Observable<TreeNode[]> {
        return this._observable;
    }

    refreshTreeNodes(): void {
        this._http.get(this._url).subscribe(respData => {
            this._data.next(respData.json().data);
        });
    }
}
