import { Injectable }            from '@angular/core';
import { Observable,
    BehaviorSubject }            from 'rxjs';
import { Http } from '@angular/http';

import { Config } from '../../shared';

@Injectable()
export class DualListDemoService {
    data: BehaviorSubject<any>;
    private url: string;

    constructor(private http: Http, private config: Config) {
        this.data = new BehaviorSubject<any>(null);
        this.url = config.apiUrl + config.nflContext;
    }

    callNflData() {
        this.http.get(this.url).subscribe(
            (respData) => {
                this.data.next(respData.json());
        });
    }

    getNflData(): Observable<any> {
        return this.data.asObservable();
    }
}
