import './lib';
import { NgModule }                        from '@angular/core';
import { BrowserModule }                   from '@angular/platform-browser';
import { FormsModule }                     from '@angular/forms';
import { HttpModule }                      from "@angular/http";
import { HeaderComponent, 
  HeaderService }                          from './header';
import { Config }                          from './shared';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        HeaderService,
        Config
    ]
})
export class CommonFrameworkModule {
}
