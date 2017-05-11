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

@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        navigationDemoRouting,
        FormsModule,
    ],
    declarations: [
        NavExampleComponent,
        SideBarsDemoComponent,
        TabsDemoComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class NavigationDemoModule {
}
