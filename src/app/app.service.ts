import { Injectable }           from '@angular/core';
import {
    BehaviorSubject,
    Observable,
}                               from 'rxjs';

import { Header }               from './header-model';
import { MockServerService }    from './shared';

@Injectable()
export class AppService {
    data: BehaviorSubject<Header>;

    constructor(serverService: MockServerService) {
        this.data = new BehaviorSubject<Header>(null);

        this.data.next(serverService.getHeaderData());
    }

    getHeaderData(): Observable<Header> {
        return this.data.asObservable();
    }
}
