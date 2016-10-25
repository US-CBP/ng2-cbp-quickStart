import { Injectable }            from '@angular/core';
import { Observable,
    BehaviorSubject }            from 'rxjs';
import { Http } from '@angular/http';

import { Config } from '../shared';
import { Table } from 'ng2-cbp-cf';

@Injectable()
export class TableDemoService {
    data: BehaviorSubject<Table>;
    private url: string;

    constructor(private http: Http, private config: Config) {
        this.data = new BehaviorSubject<Table>(null);
        this.url = config.apiUrl + config.tableContext;
    }

    getTableData(): Observable<Table> {
        return this.data.asObservable();
    }

    callTableData(obj) {
        this.http.post(this.url, JSON.stringify(obj)).subscribe(
            (respData) => {
                this.data.next(respData.json());
            });
    }
}
