import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from "@angular/forms";
import {
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
}                                       from '@angular/material';
import { BrowserModule }                from '@angular/platform-browser';

import { 
    EditUserComponent,
    UserManagementComponent,
}                                       from './user-management';
import { SampleRouting }                from './sample.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdSelectModule,
        SampleRouting,
    ],
    declarations: [
        EditUserComponent,
        UserManagementComponent,
    ],
    entryComponents: [
        EditUserComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class SampleModule {
}
