import { Injectable }            from '@angular/core';
import { Observable,
    BehaviorSubject }            from 'rxjs';
import { Http } from "@angular/http";

import { Config } from '../shared';
//import { Table } from 'ng2-cbp-cf/ng2-cbp-cf';

@Injectable()
export class TableDemoService {
    data: BehaviorSubject<any>;
    private url: string;

    constructor(private http: Http, private config : Config) { 
        this.data = new BehaviorSubject<any>(null);
        this.url = config.apiUrl + config.tableContext;
    }

    getTableData(): Observable<any> {
        return this.data.asObservable();
    }

    callTableData(obj) {
        this.http.post(this.url, JSON.stringify(obj)).subscribe( 
            (respData) => { 
                this.data.next(respData.json());
            });
    }
}
