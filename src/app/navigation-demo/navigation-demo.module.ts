import { PortalModule }                 from '@angular/cdk/portal';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { MatCardModule }                from '@angular/material/card';
import { MatCheckboxModule }            from '@angular/material/checkbox';
import { MatIconModule }                from '@angular/material/icon';
import { MatRadioModule }               from '@angular/material/radio';
import { MatSidenavModule }             from '@angular/material/sidenav';
import { MatTabsModule }                from '@angular/material/tabs';
import { BrowserModule }                from '@angular/platform-browser';
import { NavExampleComponent }          from './nav-example';
import { navigationDemoRouting }        from './navigation-demo.routing';
import { SideBarsDemoComponent }        from './side-bars-demo';
import { TabsDemoComponent }            from './tabs-demo';
import { TabsDemoToolbarComponent }     from './tabs-demo/toolbar';

import { ToolbarModule }                from 'ng2-cbp-cf/src/toolbar';

@NgModule({
    imports: [
        BrowserModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatRadioModule,
        MatSidenavModule,
        MatTabsModule,
        navigationDemoRouting,
        FormsModule,
        PortalModule,
        ToolbarModule,
    ],
    declarations: [
        NavExampleComponent,
        SideBarsDemoComponent,
        TabsDemoComponent,
        TabsDemoToolbarComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class NavigationDemoModule {
}
