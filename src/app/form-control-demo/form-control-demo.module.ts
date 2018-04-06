import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { MatButtonModule }              from '@angular/material/button';
import { MatDialogModule }              from '@angular/material/dialog';
import { MatIconModule }                from '@angular/material/icon';
import { BrowserModule }                from '@angular/platform-browser';

import { BadgeModule }                  from 'ng2-cbp-cf/src/badge';
import { DropdownTreeModule }           from 'ng2-cbp-cf/src/dropdown-tree';

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
        DropdownTreeModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
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
