import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';
import {
    BehaviorSubject,
    Observable,
}                       from 'rxjs';

import { Header }       from './header-model';
import { Config }       from './shared';

@Injectable()
export class AppService {
    data: BehaviorSubject<Header>;
    private url: string;

    constructor(private http: Http, config: Config) {
        this.data = new BehaviorSubject<Header>(null);
        this.url = config.apiUrl + config.headerContext;
        this.http.get(this.url).subscribe(
            respData => {
                this.data.next(respData.json());
            });
    }

    getHeaderData(): Observable<Header> {
        return this.data.asObservable();
    }
}
