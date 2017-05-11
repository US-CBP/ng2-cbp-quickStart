import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                           from '@angular/core';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import {
    MdButtonModule,
    MdIconModule,
    MdSidenavModule,
}                                           from '@angular/material';
import { BrowserModule }                    from '@angular/platform-browser';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import {
    HeaderModule,
    ToolbarModule,
}                                           from 'ng2-cbp-cf';

import { AppComponent }                     from './app.component';
import {
    appRouting,
    appRoutingProviders,
}                                           from './app.routing';
import { AppService }                       from './app.service';
import { FormControlDemoModule }            from './form-control-demo';
import { HomeModule }                       from './home/home.module';
import { IconsModule }                      from './icons/icons.module';
import { ListDemoModule }                   from './list-demo';
import { NavigationDemoModule }             from './navigation-demo';
import { PayPeriodCalendarDemoModule }      from './pay-period-calendar-demo';
import {
    MockData,
    MockServerService,
}                                           from './shared';
import { TableDemoModule }                  from './table-demo/table-demo.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NavigationDemoModule,
        FormsModule,
        HttpModule,
        appRouting,
        HeaderModule,
        HomeModule,
        MdButtonModule,
        MdIconModule,
        MdSidenavModule,
        FormControlDemoModule,
        TableDemoModule,
        ToolbarModule,
        ListDemoModule,
        PayPeriodCalendarDemoModule,
        IconsModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        AppService,
        MockData,
        MockServerService,
        appRoutingProviders,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
