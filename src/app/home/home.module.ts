import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { BrowserModule }    from '@angular/platform-browser';

import { HomeComponent }    from './home.component';
import { homeRouting  }     from './home.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        homeRouting,
    ],
    declarations: [
        HomeComponent,
    ],
})
export class HomeModule {
}
