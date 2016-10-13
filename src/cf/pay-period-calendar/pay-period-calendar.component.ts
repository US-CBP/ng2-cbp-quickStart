import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment/moment";

import { PayPeriodCalendarService } from "./pay-period-calendar.service";
import { PayPeriod } from "./pay-period.model";
import { PayPeriodMonth } from "./pay-period-month.model";

@Component({
    selector: "cf-pay-period-calendar",
    templateUrl: "pay-period-calendar.component.html",
    styleUrls: ["pay-period-calendar.component.scss"]
})
export class PayPeriodCalendarComponent implements OnInit {
    @Input() id: string;
    @Input() loadPayPeriodsUrl: string;
    @Input() selectedPayPeriod: PayPeriod;
    @Input() months: PayPeriodMonth[];
    @Output() payPeriodSelected = new EventEmitter<PayPeriod>();

    years: number[];
    monthsOfYear: PayPeriodMonth[];
    nextMonths: Map<PayPeriodMonth, PayPeriodMonth>;
    previousMonths: Map<PayPeriodMonth, PayPeriodMonth>;
    payPeriodsOfMonth: PayPeriod[];

    private monthsByYear: Map<number, PayPeriodMonth[]>;
    private _shownYear: number;
    private _shownMonth: PayPeriodMonth;

    constructor(private service: PayPeriodCalendarService) {
    }

    ngOnInit() {
        this.initializeMonths();
        this.initializeYears();
        this.initializeNextPrevious();
        this.initializeShownValues();

        this.monthsOfYear = this.monthsByYear.get(this._shownYear);
        this.loadPayPeriods();
    }

    private initializeMonths() {
        this.monthsByYear = new Map<number, PayPeriodMonth[]>();
        this.months.forEach(m => {
            let months = this.monthsByYear.get(m.year);
            if(months == null) {
                months = [];
                this.monthsByYear.set(m.year, months);
            }
            months.push(m);
        });

        this.monthsByYear.forEach(months => {
            months.sort((m1, m2) => {
                if(m1.number === m2.number) {
                    return 0;
                } else if(m1.number < m2.number) {
                    return -1;
                } else {
                    return 1;
                }
            });
        });
    }

    private initializeYears() {
        this.years = Array.from(this.monthsByYear.keys()).sort();
    }

    private initializeNextPrevious() {
        this.nextMonths = new Map<PayPeriodMonth, PayPeriodMonth>();
        this.previousMonths = new Map<PayPeriodMonth, PayPeriodMonth>();

        let previous = null;
        for(let y of this.years) {
            for(let m of this.monthsByYear.get(y)) {
                this.previousMonths.set(m, previous);

                if(previous != null) {
                    this.nextMonths.set(previous, m);
                }

                previous = m;
            }
        }
        this.nextMonths.set(previous, null);
    }

    private initializeShownValues() {
        let startDateMoment = this.selectedPayPeriod == null ? moment() : moment(this.selectedPayPeriod.startDate);
        let year = startDateMoment.year();
        let months = this.monthsByYear.get(year);

        if(months == null) {
            startDateMoment = moment();
            year = startDateMoment.year();
            months = this.monthsByYear.get(year);
        }

        let monthNumber = startDateMoment.month() + 1;
        let month = months.find(m => monthNumber === m.number);

        if(month == null) {
            year = this.years[0];
            month = this.findFirstAvailableMonth(year);
        }

        this._shownYear = year;
        this._shownMonth = month;
    }

    private loadPayPeriods() {
        this.service.loadPayPeriods(this.loadPayPeriodsUrl, this._shownYear, this._shownMonth.number).then(payPeriods => {
            this.payPeriodsOfMonth = payPeriods;
        });
    }

    private findFirstAvailableMonth(year: number): PayPeriodMonth {
        return this.monthsByYear.get(year)[0];
    }

    get shownYear(): number {
        return this._shownYear;
    }
    set shownYear(value: number) {
        if(this._shownYear !== value) {
            this._shownYear = value;
            this.monthsOfYear = this.monthsByYear.get(value);
            this.shownMonth = this.monthsOfYear[0];
        }
    }

    get shownMonth(): PayPeriodMonth {
        return this._shownMonth;
    }
    set shownMonth(value: PayPeriodMonth) {
        if(this._shownMonth !== value) {
            this._shownMonth = value;
            this.shownYear = value.year;
            this.loadPayPeriods();
        }
    }

    showPreviousMonth() {
        let previousMonth = this.previousMonths.get(this._shownMonth);
        if(previousMonth != null) {
            this.shownYear = previousMonth.year;
            this.shownMonth = previousMonth;
        }
    }

    showNextMonth() {
        let nextMonth = this.nextMonths.get(this._shownMonth);
        if(nextMonth != null) {
            this.shownYear = nextMonth.year;
            this.shownMonth = nextMonth;
        }
    }

    isFirstMonthShown(): boolean {
        return this.previousMonths.get(this._shownMonth) == null;
    }

    isLastMonthShown(): boolean {
        return this.nextMonths.get(this._shownMonth) == null;
    }

    payPeriodTrackBy(index: number, pp: PayPeriod): number {
        return pp.id;
    }

    isSelected(pp: PayPeriod): boolean {
        return this.selectedPayPeriod != null && this.selectedPayPeriod.id === pp.id;
    }

    selectPayPeriod(pp: PayPeriod) {
        this.payPeriodSelected.emit(pp);
    }

    dayOfMonth(pp: PayPeriod, week: number, dayOfWeek: number): number {
        return moment(pp.startDate).add(week - 1, "weeks").add(dayOfWeek, "days").date();
    }
}
