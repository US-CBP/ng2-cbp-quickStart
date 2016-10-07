import './lib';
import { NgModule }                        from '@angular/core';
import { BrowserModule }                   from '@angular/platform-browser';
import { FormsModule }                     from '@angular/forms';
import { HttpModule }                      from "@angular/http";
import { HeaderComponent }                 from './header';


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
    ]
})
export class CommonFrameworkModule {
}
