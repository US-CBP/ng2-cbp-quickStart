import {
    Component,
    OnInit,
    ViewChild
}                                           from '@angular/core';
import {
    Observable,
    Observer
}                                           from 'rxjs';

import {
    PayPeriod,
    PayPeriodCalendarComponent,
    PayPeriodMonth
}                                           from 'ng2-cbp-cf';

import { PayPeriodCalendarDemoService }     from './pay-period-calendar-demo.service';

@Component({
    templateUrl: 'pay-period-calendar-demo.component.html'
})
export class PayPeriodCalendarDemoComponent implements OnInit {
    demo1Months: PayPeriodMonth[];
    demo1PayPeriodsOfMonth: Observable<PayPeriod[]>;

    private _demo1MonthSelectedObserver: Observer<PayPeriodMonth>;

    constructor(private _service: PayPeriodCalendarDemoService) {
    }

    ngOnInit() {
        this._service.getPayPeriodMonths().subscribe(months => this.demo1Months = months);
        this.demo1PayPeriodsOfMonth = new Observable<PayPeriodMonth>(o => this._demo1MonthSelectedObserver = o)
            .switchMap(month => this._service.getPayPeriods(month));
    }

    demo1MonthSelected(month: PayPeriodMonth) {
        this._demo1MonthSelectedObserver.next(month);
    }
}
