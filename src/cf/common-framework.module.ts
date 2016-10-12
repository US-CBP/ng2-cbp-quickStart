import './lib';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import {
    DropdownTreeFieldComponent,
    DropdownTreeItemComponent
}                                           from './dropdown-tree-field';
import { HeaderComponent }                  from './header';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        DropdownTreeFieldComponent,
        DropdownTreeItemComponent,
        HeaderComponent
    ],
    exports: [
        DropdownTreeFieldComponent,
        DropdownTreeItemComponent,
        HeaderComponent
    ],
    providers: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class CommonFrameworkModule {
}
