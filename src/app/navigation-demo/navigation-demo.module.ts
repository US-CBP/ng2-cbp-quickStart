import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { MaterialModule }               from '@angular/material';
import { BrowserModule }                from '@angular/platform-browser';
import { NavExampleComponent }          from './nav-example';
import { navigationDemoRouting }        from './navigation-demo.routing';
import { SideBarsDemoComponent }        from './side-bars-demo';
import { TabsDemoComponent }            from './tabs-demo';
import { TabsDemoToolbarComponent }     from './tabs-demo/toolbar';

import { ToolbarModule }                from 'ng2-cbp-cf';

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        navigationDemoRouting,
        FormsModule,
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
