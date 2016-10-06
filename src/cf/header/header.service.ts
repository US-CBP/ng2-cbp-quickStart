import { Injectable }            from '@angular/core';
import { Observable,
    BehaviorSubject }            from 'rxjs';
import { Http } from "@angular/http";

import { Header } from './header.model';
import { Config } from '../shared/cf.config';

@Injectable()
export class HeaderService {
    private data: BehaviorSubject<Header> = new BehaviorSubject<Header>(null);
    private url: string;

    constructor(private http: Http, private config : Config) { 
        this.url = config.apiUrl + config.headerContext;
        this.http.get(this.url).subscribe( 
            respData => this.data = new BehaviorSubject<Header>(respData.json() as Header));
    }

    getHeaderData(): Observable<Header> {
        return this.data.asObservable();
    }
}
