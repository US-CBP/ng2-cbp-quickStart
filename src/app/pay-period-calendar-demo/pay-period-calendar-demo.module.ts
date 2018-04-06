import { NgModule }                         from '@angular/core';
import { FormsModule }                      from '@angular/forms';
import { BrowserModule }                    from '@angular/platform-browser';

import { PayPeriodCalendarModule }          from 'ng2-cbp-cf/src/pay-period-calendar';

import { PayPeriodCalendarDemoComponent }   from './pay-period-calendar-demo.component';
import { payPeriodCalendarDemoRouting  }    from './pay-period-calendar-demo.routing';
import { PayPeriodCalendarDemoService }     from './pay-period-calendar-demo.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        PayPeriodCalendarModule,
        payPeriodCalendarDemoRouting,
    ],
    declarations: [
        PayPeriodCalendarDemoComponent,
    ],
    providers: [
        PayPeriodCalendarDemoService,
    ],
})
export class PayPeriodCalendarDemoModule {
}
