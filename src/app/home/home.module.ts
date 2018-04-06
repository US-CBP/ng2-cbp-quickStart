import { PortalModule }         from '@angular/cdk/portal';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { MatButtonModule }      from '@angular/material/button';
import { MatIconModule }        from '@angular/material/icon';
import { BrowserModule }        from '@angular/platform-browser';
import { ToolbarModule }        from 'ng2-cbp-cf/src/toolbar';

import { HomeToolbarComponent } from './home-toolbar';
import { HomeComponent }        from './home.component';
import { homeRouting }          from './home.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        PortalModule,
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
