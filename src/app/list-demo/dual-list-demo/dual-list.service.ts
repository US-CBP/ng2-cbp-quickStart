import { Injectable }           from '@angular/core';
import {
    BehaviorSubject,
    Observable,
}                               from 'rxjs';

import { MockServerService }    from '../../shared';

@Injectable()
export class DualListDemoService {
    data: BehaviorSubject<any>;

    constructor(private _serverService: MockServerService) {
        this.data = new BehaviorSubject<any>(null);
    }

    callNflData(): void {
        this.data.next(this._serverService.getNflData());
    }

    getNflData(): Observable<any> {
        return this.data.asObservable();
    }
}
