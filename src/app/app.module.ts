import { NgModule, 
    CUSTOM_ELEMENTS_SCHEMA  }              from '@angular/core';
import { BrowserModule }                   from '@angular/platform-browser';
import { FormsModule }                     from '@angular/forms';
import { AppComponent }                    from './app.component';
import { appRouting, appRoutingProviders } from './app.routing';
import { HomeModule }                      from './home/home.module';
import { CommonFrameworkModule }           from '../cf';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    appRouting,
    CommonFrameworkModule,
    HomeModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
