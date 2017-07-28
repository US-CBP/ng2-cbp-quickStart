import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import {
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
}                                       from '@angular/material';
import { BrowserModule }                from '@angular/platform-browser';

import {
    BadgeModule,
    DropdownTreeFieldModule,
}                                       from 'ng2-cbp-cf';

import { BadgeDemoComponent }           from './badge-demo';
import {
    DropdownTreeDemoComponent,
    DropdownTreeDemoService,
}                                       from './dropdown-tree-demo';
import { formControlDemoRouting }       from './form-control-demo.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BadgeModule,
        DropdownTreeFieldModule,
        MdButtonModule,
        MdDialogModule,
        MdIconModule,
        formControlDemoRouting,
    ],
    declarations: [
        BadgeDemoComponent,
        DropdownTreeDemoComponent,
    ],
    providers: [
        DropdownTreeDemoService,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class FormControlDemoModule {
}
