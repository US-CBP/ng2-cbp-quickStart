import {
    Component,
    OnInit,
}                                       from '@angular/core';
import {
    Observable,
    Observer,
}                                       from 'rxjs';

import {
    PayPeriod,
    PayPeriodMonth,
}                                       from 'ng2-cbp-cf';

import { PayPeriodCalendarDemoService } from './pay-period-calendar-demo.service';

@Component({
    templateUrl: 'pay-period-calendar-demo.component.html',
})
export class PayPeriodCalendarDemoComponent implements OnInit {
    demo1Months: PayPeriodMonth[];
    demo1PayPeriodsOfMonth: Observable<PayPeriod[]>;
    demo1SelectedPayPeriod: PayPeriod;

    demo2Months: PayPeriodMonth[];
    demo2PayPeriodsOfMonth: Observable<PayPeriod[]>;
    demo2SelectedPayPeriod: PayPeriod;

    private _demo1MonthSelectedObserver: Observer<PayPeriodMonth>;
    private _demo2MonthSelectedObserver: Observer<PayPeriodMonth>;

    constructor(private _service: PayPeriodCalendarDemoService) {
    }

    ngOnInit(): void {
        this._service.getPayPeriodMonths().subscribe(months => {
            this.demo1Months = months;
            this.demo2Months = months;
        });
        this.demo1PayPeriodsOfMonth = new Observable<PayPeriodMonth>(o => this._demo1MonthSelectedObserver = o)
            .switchMap(month => this._service.getPayPeriods(month));
        this.demo2PayPeriodsOfMonth = new Observable<PayPeriodMonth>(o => this._demo2MonthSelectedObserver = o)
            .switchMap(month => this._service.getPayPeriods(month))
            .map(pps => {
                pps.forEach(this._demo2PayPeriodMap);
                return pps;
            });
    }

    demo1MonthSelected(month: PayPeriodMonth): void {
        this._demo1MonthSelectedObserver.next(month);
    }

    demo2MonthSelected(month: PayPeriodMonth): void {
        this._demo2MonthSelectedObserver.next(month);
    }

    private _demo2PayPeriodMap(payPeriod: PayPeriod): void {
        if(payPeriod.isSelectable && (payPeriod.number % 3 === 0)) {
            payPeriod.isSelectable = false;
        }
    }
}
