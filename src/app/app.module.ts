import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                           from '@angular/core';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { BrowserModule }                    from '@angular/platform-browser';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';

import { HeaderModule }                     from 'ng2-cbp-cf';

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
import { IconsModule }                      from './icons/icons.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        appRouting,
        HeaderModule,
        HomeModule,
        FormControlDemoModule,
        TableDemoModule,
        ListDemoModule,
        PayPeriodCalendarDemoModule,
        IconsModule,
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
