import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { MaterialModule }               from '@angular/material';
import { BrowserModule }                from '@angular/platform-browser';

import { CommonFrameworkModule }        from 'ng2-cbp-cf';

import { BadgeDemoComponent }           from './badge-demo';
import { CheckboxDemoComponent }        from './checkbox-demo';
import {
    DropdownTreeDemoComponent,
    DropdownTreeDemoService,
}                                       from './dropdown-tree-demo';
import { formControlDemoRouting }       from './form-control-demo.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        MaterialModule,
        formControlDemoRouting,
    ],
    declarations: [
        BadgeDemoComponent,
        CheckboxDemoComponent,
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
