import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import {
    MdButtonModule,
    MdCardModule,
    MdDatepickerModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdNativeDateModule,
}                                       from '@angular/material';
import { BrowserModule }                from '@angular/platform-browser';

import {
    BadgeModule,
    CheckboxModule,
    DropdownTreeFieldModule,
}                                       from 'ng2-cbp-cf';

import { BadgeDemoComponent }           from './badge-demo';
import { CheckboxDemoComponent }        from './checkbox-demo';
import { DatepickerDemoComponent }        from './datepicker-demo';
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
        CheckboxModule,
        DropdownTreeFieldModule,
        MdButtonModule,
        MdCardModule,
        MdDatepickerModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdNativeDateModule,
        formControlDemoRouting,
    ],
    declarations: [
        BadgeDemoComponent,
        CheckboxDemoComponent,
        DatepickerDemoComponent,
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
