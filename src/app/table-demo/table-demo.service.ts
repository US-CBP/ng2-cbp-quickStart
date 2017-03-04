import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';
import {
    BehaviorSubject,
    Observable,
}                       from 'rxjs';

import { Table }        from 'ng2-cbp-cf';

import { Config }       from '../shared';

@Injectable()
export class TableDemoService {
    data: BehaviorSubject<Table>;
    private url: string;

    constructor(private http: Http, config: Config) {
        this.data = new BehaviorSubject<Table>(null);
        this.url = config.apiUrl + config.tableContext;
    }

    getTableData(): Observable<Table> {
        return this.data.asObservable();
    }

    callTableData(obj: any): void {
        this.http.post(this.url, JSON.stringify(obj)).subscribe(
            respData => {
                this.data.next(respData.json());
            });
    }
}
