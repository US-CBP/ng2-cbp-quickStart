import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { BrowserModule }                from '@angular/platform-browser';

import { CommonFrameworkModule }        from 'ng2-cbp-cf';

import {
    DualListDemoComponent,
    DualListDemoService,
}                                       from './dual-list-demo';
import { listDemoRouting }              from './list-demo.routing';
import { ListGroupDemoComponent }       from './list-group-demo';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        listDemoRouting,
    ],
    declarations: [
        DualListDemoComponent,
        ListGroupDemoComponent,
    ],
    providers: [
        DualListDemoService,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class ListDemoModule {
}
