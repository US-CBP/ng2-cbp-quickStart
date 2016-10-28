import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA
}                                       from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }                  from '@angular/forms';

import { CommonFrameworkModule }        from 'ng2-cbp-cf';
import { ListGroupDemoComponent }       from './list-group-demo';
import {
    DualListDemoComponent,
    DualListDemoService

}                                       from './dual-list-demo';
import { listDemoRouting }              from './list-demo.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        listDemoRouting
    ],
    declarations: [
        DualListDemoComponent,
        ListGroupDemoComponent
    ],
    providers: [
        DualListDemoService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ListDemoModule {
}
