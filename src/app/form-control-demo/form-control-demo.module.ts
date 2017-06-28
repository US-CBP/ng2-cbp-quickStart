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
    CheckboxModule,
    DropdownTreeFieldModule,
    ToolbarModule,
}                                       from 'ng2-cbp-cf';

import { BadgeDemoComponent }           from './badge-demo';
import { CheckboxDemoComponent }        from './checkbox-demo';
import {
    DropdownTreeDemoComponent,
    DropdownTreeDemoService,
}                                       from './dropdown-tree-demo';
import { formControlDemoRouting }       from './form-control-demo.routing';
import {
    ToolbarDemoComponent,
    ToolbarDemoToolbarComponent,
}                                       from './toolbar-demo';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        BadgeModule,
        CheckboxModule,
        DropdownTreeFieldModule,
        MdButtonModule,
        MdDialogModule,
        MdIconModule,
        ToolbarModule,
        formControlDemoRouting,
    ],
    declarations: [
        BadgeDemoComponent,
        CheckboxDemoComponent,
        DropdownTreeDemoComponent,
        ToolbarDemoComponent,
        ToolbarDemoToolbarComponent,
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
