import {
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
}                                       from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { BrowserModule }                from '@angular/platform-browser';

import { CommonFrameworkModule }        from 'ng2-cbp-cf';

import { ButtonDemoComponent }          from './button-demo';
import { CheckboxDemoComponent }        from './checkbox-demo';
import {
    DropdownTreeDemoComponent,
    DropdownTreeDemoService,
}                                       from './dropdown-tree-demo';
import { formControlDemoRouting }       from './form-control-demo.routing';
import { RadioButtonDemoComponent }     from './radio-button-demo';
import { SelectDemoComponent }          from './select-demo';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        formControlDemoRouting,
    ],
    declarations: [
        ButtonDemoComponent,
        CheckboxDemoComponent,
        DropdownTreeDemoComponent,
        RadioButtonDemoComponent,
        SelectDemoComponent,
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
