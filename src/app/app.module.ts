import { NgModule, 
    CUSTOM_ELEMENTS_SCHEMA  }              from '@angular/core';
import { BrowserModule }                   from '@angular/platform-browser';
import { FormsModule }                     from '@angular/forms';

import { Config }                          from './shared';
import { AppService }                      from './app.service';
import { AppComponent }                    from './app.component';
import { appRouting, appRoutingProviders } from './app.routing';
import { HomeModule }                      from './home/home.module';
import { TableModule }                      from './table/table.module';
import { FormControlDemoModule }           from './form-control-demo';


import { CommonFrameworkModule }           from '../cf';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    appRouting,
    CommonFrameworkModule,
    HomeModule,
    FormControlDemoModule,
    TableModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders,
    Config,
    AppService
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
