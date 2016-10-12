import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA
}                                       from "@angular/core";
import { BrowserModule }                from "@angular/platform-browser";
import { FormsModule }                  from "@angular/forms";

import { CommonFrameworkModule }        from "../../cf";
import { DropdownTreeDemoComponent }    from "./dropdown-tree-demo";
import { formControlDemoRouting }       from "./form-control-demo.routing";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        formControlDemoRouting
    ],
    declarations: [
        DropdownTreeDemoComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FormControlDemoModule {
}
