import { Injectable }           from '@angular/core';
import {
    BehaviorSubject,
    Observable,
}                               from 'rxjs';

import { Table }                from 'ng2-cbp-cf';

import { MockServerService }    from '../shared';

@Injectable()
export class TableDemoService {
    data: BehaviorSubject<Table>;

    constructor(private _serverService: MockServerService) {
        this.data = new BehaviorSubject<Table>(null);
    }

    getTableData(): Observable<Table> {
        return this.data.asObservable();
    }

    callTableData(obj: any): void {
        this.data.next(this._serverService.getTableData(JSON.stringify(obj)));
        // this.http.post(this.url, JSON.stringify(obj)).subscribe(
        //     respData => {
        //         this.data.next(respData.json());
        //     });
    }
}
