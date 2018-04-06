import { Injectable }           from '@angular/core';
import { URLSearchParams }      from '@angular/http';
import * as moment              from 'moment/moment';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';

import {
    PayPeriod,
    PayPeriodMonth,
}                               from 'ng2-cbp-cf/src/pay-period-calendar';

import { MockServerService }    from '../shared';

@Injectable()
export class PayPeriodCalendarDemoService {
    constructor(private _serverService: MockServerService) {
    }

    getPayPeriodMonths(): Observable<PayPeriodMonth[]> {
        return this._serverService.getPayPeriodMonthData()
            .pipe(map(response => response as PayPeriodMonth[]));
    }

    getPayPeriods(month: PayPeriodMonth): Observable<PayPeriod[]> {
        const search = new URLSearchParams();
        search.set('year', month.year.toString());
        search.set('month', month.number.toString());

        return this._serverService.getPayPeriodData({ search })
            .pipe(map(response => (response as any[]).map(i => {
                return {
                id: i.id,
                number: i.number,
                startDate: moment(i.startDate).toDate(),
                isSelectable: i.isSelectable,
            } as PayPeriod;
        })));
    }
}
