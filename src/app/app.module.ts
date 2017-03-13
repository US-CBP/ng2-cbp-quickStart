import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                           from '@angular/core';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { MaterialModule }                   from '@angular/material';
import { BrowserModule }                    from '@angular/platform-browser';

import { CommonFrameworkModule }            from 'ng2-cbp-cf';

import { AppComponent }                     from './app.component';
import {
    appRouting,
    appRoutingProviders,
}                                           from './app.routing';
import { AppService }                       from './app.service';
import { FormControlDemoModule }            from './form-control-demo';
import { HomeModule }                       from './home/home.module';
import { ListDemoModule }                   from './list-demo';
import { PayPeriodCalendarDemoModule }      from './pay-period-calendar-demo';
import { Config }                           from './shared';
import { TableDemoModule }                  from './table-demo/table-demo.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        appRouting,
        CommonFrameworkModule,
        HomeModule,
        FormControlDemoModule,
        TableDemoModule,
        ListDemoModule,
        PayPeriodCalendarDemoModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        appRoutingProviders,
        Config,
        AppService,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
