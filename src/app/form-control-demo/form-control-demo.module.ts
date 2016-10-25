import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA
}                                       from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }                  from '@angular/forms';

import { CommonFrameworkModule }        from 'ng2-cbp-cf';
import { ButtonDemoComponent }          from './button-demo';
import { DropdownTreeDemoComponent }    from './dropdown-tree-demo';
import { RadioButtonDemoComponent }     from './radio-button-demo';
import { CheckboxDemoComponent }     from './checkbox-demo';
import { formControlDemoRouting }       from './form-control-demo.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        formControlDemoRouting
    ],
    declarations: [
        ButtonDemoComponent,
        DropdownTreeDemoComponent,
        RadioButtonDemoComponent,
        CheckboxDemoComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FormControlDemoModule {
}
