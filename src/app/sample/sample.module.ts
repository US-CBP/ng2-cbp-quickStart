import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { MatButtonModule }              from '@angular/material/button';
import { MatCardModule }                from '@angular/material/card';
import { MatDialogModule }              from '@angular/material/dialog';
import { MatIconModule }                from '@angular/material/icon';
import { MatInputModule }               from '@angular/material/input';
import { MatSelectModule }              from '@angular/material/select';
import { MatTableModule }               from '@angular/material/table';
import { BrowserModule }                from '@angular/platform-browser';

import { sampleRouting }                from './sample.routing';
import {
    EditUserComponent,
    UserManagementComponent,
}                                       from './user-management';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
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
