import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import {
    MdButtonModule,
    MdIconModule,
 }                              from '@angular/material';
import { BrowserModule }        from '@angular/platform-browser';
import { ToolbarModule }        from 'ng2-cbp-cf';

import { HomeToolbarComponent } from './home-toolbar';
import { HomeComponent }        from './home.component';
import { homeRouting }          from './home.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MdButtonModule,
        MdIconModule,
        ToolbarModule,
        homeRouting,
    ],
    declarations: [
        HomeComponent,
        HomeToolbarComponent,
    ],
})
export class HomeModule {
}
