import { Injectable }           from '@angular/core';
import {
    Http,
    URLSearchParams
}                               from '@angular/http';
import { Observable }           from 'rxjs';

import * as moment              from 'moment/moment';

import {
    PayPeriod,
    PayPeriodMonth
}                               from 'ng2-cbp-cf';

import { Config }               from '../shared';

@Injectable()
export class PayPeriodCalendarDemoService {
    private _payPeriodUrl: string;
    private _payPeriodMonthUrl: string;

    constructor(private _http: Http, private _config: Config) {
        this._payPeriodUrl = _config.apiUrl + _config.payPeriodContext;
        this._payPeriodMonthUrl = _config.apiUrl + _config.payPeriodMonthContext;
    }

    getPayPeriodMonths(): Observable<PayPeriodMonth[]> {
        return this._http.get(this._payPeriodMonthUrl).map(response => <PayPeriodMonth[]>response.json());
    }

    getPayPeriods(month: PayPeriodMonth): Observable<PayPeriod[]> {
        var search = new URLSearchParams();
        search.set('year', month.year.toString());
        search.set('month', month.number.toString());

        return this._http.get(this._payPeriodUrl, { search })
            .map(response => (<any[]>response.json()).map(i => <PayPeriod>{
                id: i.id,
                number: i.number,
                startDate: moment(i.startDate).toDate(),
                isSelectable: i.isSelectable
            }));
    }
}
