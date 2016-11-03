import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule }                      from '@angular/forms';

import { CommonFrameworkModule }            from 'ng2-cbp-cf';
import { PayPeriodCalendarDemoComponent }   from './pay-period-calendar-demo.component';
import { PayPeriodCalendarDemoService }     from './pay-period-calendar-demo.service';
import { payPeriodCalendarDemoRouting  }    from './pay-period-calendar-demo.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        payPeriodCalendarDemoRouting
    ],
    declarations: [
        PayPeriodCalendarDemoComponent
    ],
    providers: [
        PayPeriodCalendarDemoService
    ]
})
export class PayPeriodCalendarDemoModule {
}
