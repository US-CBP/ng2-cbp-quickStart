import { Injectable }           from '@angular/core';
import {
    Http,
    URLSearchParams,
}                               from '@angular/http';
import * as moment              from 'moment/moment';
import { Observable }           from 'rxjs';

import {
    PayPeriod,
    PayPeriodMonth,
}                               from 'ng2-cbp-cf';

import { Config }               from '../shared';

@Injectable()
export class PayPeriodCalendarDemoService {
    private _payPeriodUrl: string;
    private _payPeriodMonthUrl: string;

    constructor(private _http: Http, config: Config) {
        this._payPeriodUrl = config.apiUrl + config.payPeriodContext;
        this._payPeriodMonthUrl = config.apiUrl + config.payPeriodMonthContext;
    }

    getPayPeriodMonths(): Observable<PayPeriodMonth[]> {
        return this._http.get(this._payPeriodMonthUrl).map(response => <PayPeriodMonth[]>response.json());
    }

    getPayPeriods(month: PayPeriodMonth): Observable<PayPeriod[]> {
        let search = new URLSearchParams();
        search.set('year', month.year.toString());
        search.set('month', month.number.toString());

        return this._http.get(this._payPeriodUrl, { search })
            .map(response => (<any[]>response.json()).map(i => <PayPeriod>{
                id: i.id,
                number: i.number,
                startDate: moment(i.startDate).toDate(),
                isSelectable: i.isSelectable,
            }));
    }
}
