import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import * as moment from "moment/moment";

import { standardISOFormat } from "../shared/date.values";

import { PayPeriodCalendarComponent } from "./pay-period-calendar.component";
import { PayPeriodCalendarService } from "./pay-period-calendar.service";
import { PayPeriodMonth } from "./pay-period-month.model";

describe("PayPeriodCalendarComponent", () => {
    let months: PayPeriodMonth[];
    let fixture: ComponentFixture<PayPeriodCalendarComponent>;
    let service: PayPeriodCalendarService;
    let component: PayPeriodCalendarComponent;

    beforeEach(() => {
        let serviceStub = {
            loadPayPeriods: jasmine.createSpy("loadPayPeriods").and.returnValue(Promise.resolve([]))
        };

        months = createMonthsFromCurrent(-12, 12);

        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [PayPeriodCalendarComponent],
            providers: [{ provide: PayPeriodCalendarService, useValue: serviceStub }]
        });
        fixture = TestBed.createComponent(PayPeriodCalendarComponent);
        service = fixture.debugElement.injector.get(PayPeriodCalendarService);

        component = fixture.componentInstance;
        component.loadPayPeriodsUrl = "test-url";
        component.months = months;
    });

    describe("on init", () => {
        it("should set shownYear to year of the selectedPayPeriod", () => {
            let startDate = moment().startOf("day").startOf("month").add(2, "months");
            let selectedPayPeriod = {
                id: 201622,
                number: 22,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };

            component.selectedPayPeriod = selectedPayPeriod;
            fixture.detectChanges();

            expect(component.shownYear).toBe(startDate.year());
        });

        it("should set shownMonth to month of the selectedPayPeriod", () => {
            let startDate = moment().startOf("day").startOf("month").add(2, "months");
            let selectedPayPeriod = {
                id: 201622,
                number: 22,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };

            component.selectedPayPeriod = selectedPayPeriod;
            fixture.detectChanges();

            let month = months.find(m => m.year === startDate.year() && m.number === startDate.month() + 1);
            expect(component.shownMonth).toBe(month);
        });

        it("should set shownYear to current year when selectedPayPeriod is not in months", () => {
            let startDate = moment().startOf("day").startOf("month").add(20, "months");
            let selectedPayPeriod = {
                id: 201622,
                number: 22,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };

            component.selectedPayPeriod = selectedPayPeriod;
            fixture.detectChanges();

            expect(component.shownYear).toBe(moment().year());
        });

        it("should set shownMonth to current month when selectedPayPeriod is not in months", () => {
            let startDate = moment().startOf("day").startOf("month").add(20, "months");
            let selectedPayPeriod = {
                id: 201622,
                number: 22,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };

            component.selectedPayPeriod = selectedPayPeriod;
            fixture.detectChanges();

            let currentMoment = moment();
            let month = months.find(m => m.year === currentMoment.year() && m.number === currentMoment.month() + 1);
            expect(component.shownMonth).toBe(month);
        });

        it("should set shownYear to current year when selectedPayPeriod is null", () => {
            fixture.detectChanges();

            expect(component.shownYear).toBe(moment().year());
        });

        it("should set shownMonth to current month when selectedPayPeriod is null", () => {
            fixture.detectChanges();

            let currentMoment = moment();
            let month = months.find(m => m.year === currentMoment.year() && m.number === currentMoment.month() + 1);
            expect(component.shownMonth).toBe(month);
        });

        it("should set shownYear to first year when selectedPayPeriod is null and current month is not in months", () => {
            months = createMonthsFromCurrent(-13, -2);
            component.months = months;

            fixture.detectChanges();

            expect(component.shownYear).toBe(months[0].year);
        });

        it("should set shownMonth to current month when selectedPayPeriod is null and current month is not in months", () => {
            months = createMonthsFromCurrent(-13, -2);
            component.months = months;

            fixture.detectChanges();

            expect(component.shownMonth).toBe(months[0]);
        });

        it("should set years to distinct years in months", () => {
            fixture.detectChanges();

            let currentYear = moment().year();
            expect(component.years).toEqual([currentYear - 1, currentYear, currentYear + 1]);
        });

        it("should set monthsOfYear to months in shown year", () => {
            fixture.detectChanges();

            let currentYear = moment().year();
            let monthsOfYear = months.filter(m => m.year === currentYear);
            expect(component.monthsOfYear).toEqual(monthsOfYear);
        });

        it("should call loadPayPeriods from service with shownYear and shownMonth.number", () => {
            fixture.detectChanges();

            let currentMoment = moment();
            expect(service.loadPayPeriods).toHaveBeenCalledWith(component.loadPayPeriodsUrl, currentMoment.year(), currentMoment.month() + 1);
        });

        it("should set payPeriodsOfMonth to results of loadPayPeriods from service", fakeAsync(() => {
            let payPeriodsOfMonth = [
                {
                    id: 201525,
                    number: 25,
                    startDate: "2015-12-27T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201601,
                    number: 1,
                    startDate: "2016-01-10T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201602,
                    number: 2,
                    startDate: "2016-01-24T00:00:00",
                    isSelectable: true
                }
            ];
            (<jasmine.Spy>service.loadPayPeriods).and.returnValue(Promise.resolve(payPeriodsOfMonth));

            fixture.detectChanges();

            tick();
            expect(component.payPeriodsOfMonth).toEqual(payPeriodsOfMonth);
        }));
    });

    describe("isFirstMonthShown", () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it("should return true when first month is shown", () => {
            component.shownYear = months[0].year;
            component.shownMonth = months[0];

            expect(component.isFirstMonthShown()).toBe(true);
        });

        it("should return false when first month is not shown", () => {
            component.shownYear = months[1].year;
            component.shownMonth = months[1];

            expect(component.isFirstMonthShown()).toBe(false);
        });
    });

    describe("isLastMonthShown", () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it("should return true when last month is shown", () => {
            component.shownYear = months[months.length - 1].year;
            component.shownMonth = months[months.length - 1];

            expect(component.isLastMonthShown()).toBe(true);
        });

        it("should return false when last month is not shown", () => {
            component.shownYear = months[months.length - 2].year;
            component.shownMonth = months[months.length - 2];

            expect(component.isLastMonthShown()).toBe(false);
        });
    });

    describe("showPreviousMonth", () => {
        beforeEach(fakeAsync(() => {
            fixture.detectChanges();

            tick();
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();
        }));

        it("should not change shownYear when shownMonth is first month", () => {
            component.shownYear = months[0].year;
            component.shownMonth = months[0];

            component.showPreviousMonth();

            expect(component.shownYear).toBe(months[0].year);
        });

        it("should not change shownMonth when shownMonth is first month", () => {
            component.shownYear = months[0].year;
            component.shownMonth = months[0];

            component.showPreviousMonth();

            expect(component.shownMonth).toBe(months[0]);
        });

        it("should not call loadPayPeriods on service when shownMonth is first month", fakeAsync(() => {
            component.shownYear = months[0].year;
            component.shownMonth = months[0];
            tick();
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();

            component.showPreviousMonth();

            expect(service.loadPayPeriods).not.toHaveBeenCalled();
        }));

        it("should not change shownYear when previous month in the same year", () => {
            let currentYear = moment().year();
            let middleMonth = months.find(m => m.year === currentYear && m.number === 6);

            component.shownYear = currentYear;
            component.shownMonth = middleMonth;

            component.showPreviousMonth();

            expect(component.shownYear).toBe(currentYear);
        });

        it("should change shownMonth when previous month in the same year", () => {
            let currentYear = moment().year();
            let middleMonth = months.find(m => m.year === currentYear && m.number === 6);

            component.shownYear = currentYear;
            component.shownMonth = middleMonth;

            component.showPreviousMonth();

            let previousMonth = months.find(m => m.year === currentYear && m.number === 5);
            expect(component.shownMonth).toBe(previousMonth);
        });

        it("should change shownYear when previous month in the different year", () => {
            let currentYear = moment().year();
            let firstMonth = months.find(m => m.year === currentYear && m.number === 1);

            component.shownYear = currentYear;
            component.shownMonth = firstMonth;

            component.showPreviousMonth();

            expect(component.shownYear).toBe(currentYear - 1);
        });

        it("should change shownMonth when previous month in the same year", () => {
            let currentYear = moment().year();
            let firstMonth = months.find(m => m.year === currentYear && m.number === 1);

            component.shownYear = currentYear;
            component.shownMonth = firstMonth;

            component.showPreviousMonth();

            let previousMonth = months.find(m => m.year === currentYear - 1 && m.number === 12);
            expect(component.shownMonth).toBe(previousMonth);
        });

        it("should call loadPayPeriods on service", fakeAsync(() => {
            let currentYear = moment().year();
            let middleMonth = months.find(m => m.year === currentYear && m.number === 6);

            component.shownYear = currentYear;
            component.shownMonth = middleMonth;
            tick();
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();

            component.showPreviousMonth();

            let previousMonth = months.find(m => m.year === currentYear && m.number === 5);
            expect(service.loadPayPeriods).toHaveBeenCalledWith(component.loadPayPeriodsUrl, previousMonth.year, previousMonth.number);
        }));

        it("should set payPeriodsOfMonth to results of loadPayPeriods from service", fakeAsync(() => {
            let currentYear = moment().year();
            let middleMonth = months.find(m => m.year === currentYear && m.number === 6);

            component.shownYear = currentYear;
            component.shownMonth = middleMonth;
            tick();

            let payPeriodsOfMonth = [
                {
                    id: 201525,
                    number: 25,
                    startDate: "2015-12-27T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201601,
                    number: 1,
                    startDate: "2016-01-10T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201602,
                    number: 2,
                    startDate: "2016-01-24T00:00:00",
                    isSelectable: true
                }
            ];
            (<jasmine.Spy>service.loadPayPeriods).and.returnValue(Promise.resolve(payPeriodsOfMonth));
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();

            component.showPreviousMonth();

            tick();
            expect(component.payPeriodsOfMonth).toEqual(payPeriodsOfMonth);
        }));
    });

    describe("showNextMonth", () => {
        beforeEach(fakeAsync(() => {
            fixture.detectChanges();

            tick();
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();
        }));

        it("should not change shownYear when shownMonth is last month", () => {
            component.shownYear = months[months.length - 1].year;
            component.shownMonth = months[months.length - 1];

            component.showNextMonth();

            expect(component.shownYear).toBe(months[months.length - 1].year);
        });

        it("should not change shownMonth when shownMonth is last month", () => {
            component.shownYear = months[months.length - 1].year;
            component.shownMonth = months[months.length - 1];

            component.showNextMonth();

            expect(component.shownMonth).toBe(months[months.length - 1]);
        });

        it("should not call loadPayPeriods on service when shownMonth is last month", fakeAsync(() => {
            component.shownYear = months[months.length - 1].year;
            component.shownMonth = months[months.length - 1];
            tick();
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();

            component.showNextMonth();

            expect(service.loadPayPeriods).not.toHaveBeenCalled();
        }));

        it("should not change shownYear when next month in the same year", () => {
            let currentYear = moment().year();
            let middleMonth = months.find(m => m.year === currentYear && m.number === 6);

            component.shownYear = currentYear;
            component.shownMonth = middleMonth;

            component.showNextMonth();

            expect(component.shownYear).toBe(currentYear);
        });

        it("should change shownMonth when next month in the same year", () => {
            let currentYear = moment().year();
            let middleMonth = months.find(m => m.year === currentYear && m.number === 6);

            component.shownYear = currentYear;
            component.shownMonth = middleMonth;

            component.showNextMonth();

            let nextMonth = months.find(m => m.year === currentYear && m.number === 7);
            expect(component.shownMonth).toBe(nextMonth);
        });

        it("should change shownYear when next month in the different year", () => {
            let currentYear = moment().year();
            let lastMonth = months.find(m => m.year === currentYear && m.number === 12);

            component.shownYear = currentYear;
            component.shownMonth = lastMonth;

            component.showNextMonth();

            expect(component.shownYear).toBe(currentYear + 1);
        });

        it("should change shownMonth when next month in the same year", () => {
            let currentYear = moment().year();
            let firstMonth = months.find(m => m.year === currentYear && m.number === 12);

            component.shownYear = currentYear;
            component.shownMonth = firstMonth;

            component.showNextMonth();

            let nextMonth = months.find(m => m.year === currentYear + 1 && m.number === 1);
            expect(component.shownMonth).toBe(nextMonth);
        });

        it("should call loadPayPeriods on service", fakeAsync(() => {
            let currentYear = moment().year();
            let middleMonth = months.find(m => m.year === currentYear && m.number === 6);

            component.shownYear = currentYear;
            component.shownMonth = middleMonth;
            tick();
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();

            component.showNextMonth();

            let nextMonth = months.find(m => m.year === currentYear && m.number === 7);
            expect(service.loadPayPeriods).toHaveBeenCalledWith(component.loadPayPeriodsUrl, nextMonth.year, nextMonth.number);
        }));

        it("should set payPeriodsOfMonth to results of loadPayPeriods from service", fakeAsync(() => {
            let currentYear = moment().year();
            let middleMonth = months.find(m => m.year === currentYear && m.number === 6);

            component.shownYear = currentYear;
            component.shownMonth = middleMonth;
            tick();

            let payPeriodsOfMonth = [
                {
                    id: 201525,
                    number: 25,
                    startDate: "2015-12-27T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201601,
                    number: 1,
                    startDate: "2016-01-10T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201602,
                    number: 2,
                    startDate: "2016-01-24T00:00:00",
                    isSelectable: true
                }
            ];
            (<jasmine.Spy>service.loadPayPeriods).and.returnValue(Promise.resolve(payPeriodsOfMonth));
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();

            component.showNextMonth();

            tick();
            expect(component.payPeriodsOfMonth).toEqual(payPeriodsOfMonth);
        }));
    });

    describe("isSelected", () => {
        beforeEach(() => {
            let startDate = moment().startOf("day").startOf("month");
            let selectedPayPeriod = {
                id: 201622,
                number: 22,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };
            component.selectedPayPeriod = selectedPayPeriod;

            fixture.detectChanges();
        });

        it("should return false when pay periods has different id as selected pay period", () => {
            let startDate = moment().startOf("day").startOf("month");
            let payPeriod = {
                id: 201601,
                number: 1,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };

            expect(component.isSelected(payPeriod)).toBe(false);
        });

        it("should return true when pay periods has same id as selected pay period", () => {
            let startDate = moment().startOf("day").startOf("month");
            let payPeriod = {
                id: 201622,
                number: 22,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };

            expect(component.isSelected(payPeriod)).toBe(true);
        });
    });

    describe("selectPayPeriod", () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it("should not change selectedPayPeriod directly", () => {
            let startDate = moment().startOf("day").startOf("month");
            let payPeriod = {
                id: 201601,
                number: 1,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };

            component.selectPayPeriod(payPeriod);

            expect(component.selectedPayPeriod).toBeUndefined();
        });

        it("should raise payPeriodSelected event", () => {
            let subscriber = jasmine.createSpy("onPayPeriodSelected");
            component.payPeriodSelected.subscribe(subscriber);

            let startDate = moment().startOf("day").startOf("month");
            let payPeriod = {
                id: 201601,
                number: 1,
                startDate: startDate.format(standardISOFormat),
                isSelectable: true
            };

            component.selectPayPeriod(payPeriod);

            expect(subscriber).toHaveBeenCalledWith(payPeriod);
        });
    });

    describe("setting shownYear", () => {
        beforeEach(fakeAsync(() => {
            fixture.detectChanges();

            tick();
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();
        }));

        it("to same value should not change shownMonth", () => {
            let shownYear = component.shownYear;
            let shownMonth = component.shownMonth;

            component.shownYear = shownYear;

            expect(component.shownMonth).toBe(shownMonth);
        });

        it("to same value should not call loadPayPeriods on service", () => {
            let shownYear = component.shownYear;

            component.shownYear = shownYear;

            expect(service.loadPayPeriods).not.toHaveBeenCalled();
        });

        it("to new value should change shownMonth to first month of new year", () => {
            let shownYear = component.shownYear;
            let firstMonth = months.find(m => m.year === shownYear + 1 && m.number === 1);

            component.shownYear = shownYear + 1;

            expect(component.shownMonth).toBe(firstMonth);
        });

        it("to new value should call loadPayPeriods on service", () => {
            let shownYear = component.shownYear;
            let firstMonth = months.find(m => m.year === shownYear + 1 && m.number === 1);

            component.shownYear = shownYear + 1;

            expect(service.loadPayPeriods).toHaveBeenCalledWith(component.loadPayPeriodsUrl, firstMonth.year, firstMonth.number);
        });

        it("to new value should set payPeriodsOfMonth to results of loadPayPeriods from service", fakeAsync(() => {
            let payPeriodsOfMonth = [
                {
                    id: 201525,
                    number: 25,
                    startDate: "2015-12-27T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201601,
                    number: 1,
                    startDate: "2016-01-10T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201602,
                    number: 2,
                    startDate: "2016-01-24T00:00:00",
                    isSelectable: true
                }
            ];
            (<jasmine.Spy>service.loadPayPeriods).and.returnValue(Promise.resolve(payPeriodsOfMonth));

            let shownYear = component.shownYear;

            component.shownYear = shownYear + 1;

            tick();
            expect(component.payPeriodsOfMonth).toEqual(payPeriodsOfMonth);
        }));

        it("to new value should change shownMonth to first available month of new year when first month is not available", () => {
            let shownYear = component.shownYear;
            let firstAvailableMonth = months[0];

            component.shownYear = shownYear - 1;

            expect(component.shownMonth).toBe(firstAvailableMonth);
        });

        it("to new value should change monthsOfYear to months for the new year", () => {
            let shownYear = component.shownYear;
            let monthsOfYear = months.filter(m => m.year === shownYear - 1);

            component.shownYear = shownYear - 1;

            expect(component.monthsOfYear).toEqual(monthsOfYear);
        });
    });

    describe("setting shownMonth", () => {
        beforeEach(fakeAsync(() => {
            fixture.detectChanges();

            tick();
            (<jasmine.Spy>service.loadPayPeriods).calls.reset();
        }));

        it("to same value should not call loadPayPeriods on service", () => {
            let shownMonth = component.shownMonth;

            component.shownMonth = shownMonth;

            expect(service.loadPayPeriods).not.toHaveBeenCalled();
        });

        it("to new value should call loadPayPeriods on service", () => {
            component.shownMonth = months[0];

            expect(service.loadPayPeriods).toHaveBeenCalledWith(component.loadPayPeriodsUrl, months[0].year, months[0].number);
        });

        it("to new value should set payPeriodsOfMonth to results of loadPayPeriods from service", fakeAsync(() => {
            let payPeriodsOfMonth = [
                {
                    id: 201525,
                    number: 25,
                    startDate: "2015-12-27T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201601,
                    number: 1,
                    startDate: "2016-01-10T00:00:00",
                    isSelectable: true
                },
                {
                    id: 201602,
                    number: 2,
                    startDate: "2016-01-24T00:00:00",
                    isSelectable: true
                }
            ];
            (<jasmine.Spy>service.loadPayPeriods).and.returnValue(Promise.resolve(payPeriodsOfMonth));

            component.shownMonth = months[0];

            tick();
            expect(component.payPeriodsOfMonth).toEqual(payPeriodsOfMonth);
        }));
    });

    function createMonthsFromCurrent(startIndex, endIndex) {
        let results = [];
        let currentMoment = moment().startOf("day").startOf("month");
        for(let i = startIndex; i <= endIndex; i++) {
            let m = currentMoment.clone().add(i, "months");
            results.push({ year: m.year(), number: m.month() + 1, name: m.format("MMM") });
        }

        return results;
    }
});
