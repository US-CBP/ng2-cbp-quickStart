import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA
}                                       from "@angular/core";
import { BrowserModule }                from "@angular/platform-browser";
import { FormsModule }                  from "@angular/forms";

import { CommonFrameworkModule }        from "ng2-cf/ng2-cf";
import { DropdownTreeDemoComponent }    from "./dropdown-tree-demo";
//import { RadioButtonDemoComponent }     from "./radio-button-demo";
import { formControlDemoRouting }       from "./form-control-demo.routing";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        formControlDemoRouting
    ],
    declarations: [
        DropdownTreeDemoComponent//,
        //RadioButtonDemoComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FormControlDemoModule {
}
