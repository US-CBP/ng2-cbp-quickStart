import { Injectable }           from '@angular/core';
import { URLSearchParams }      from '@angular/http';
import * as moment              from 'moment/moment';
import { Observable }           from 'rxjs';

import {
    PayPeriod,
    PayPeriodMonth,
}                               from 'ng2-cbp-cf';

import { MockServerService }        from '../shared';

@Injectable()
export class PayPeriodCalendarDemoService {

    constructor(private _serverService: MockServerService) {
    }

    getPayPeriodMonths(): Observable<PayPeriodMonth[]> {
        return this._serverService.getPayPeriodMonthData().map(response => <PayPeriodMonth[]>response);
    }

    getPayPeriods(month: PayPeriodMonth): Observable<PayPeriod[]> {
        let search = new URLSearchParams();
        search.set('year', month.year.toString());
        search.set('month', month.number.toString());

        return this._serverService.getPayPeriodData({ search })
            .map(response => (<any[]>response).map(i => <PayPeriod>{
                id: i.id,
                number: i.number,
                startDate: moment(i.startDate).toDate(),
                isSelectable: i.isSelectable,
            }));
    }
}
