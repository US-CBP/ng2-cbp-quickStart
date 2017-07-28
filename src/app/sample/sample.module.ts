import { CdkTableModule }               from '@angular/cdk';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import {
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdTableModule,
}                                       from '@angular/material';
import { BrowserModule }                from '@angular/platform-browser';

import { sampleRouting }                from './sample.routing';
import {
    EditUserComponent,
    UserManagementComponent,
}                                       from './user-management';

@NgModule({
    imports: [
        BrowserModule,
        CdkTableModule,
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdSelectModule,
        MdTableModule,
        sampleRouting,
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
