import { ModuleWithProviders }  from '@angular/core';
import {
    Routes,
    RouterModule
}                               from '@angular/router';

import { PayPeriodCalendarDemoComponent } from './pay-period-calendar-demo.component';

const payPeriodCalendarDemoRoutes: Routes = [
    { path: 'pay-period-calendar-demo', component: PayPeriodCalendarDemoComponent }
];

export const payPeriodCalendarDemoRouting: ModuleWithProviders = RouterModule.forChild(payPeriodCalendarDemoRoutes);
