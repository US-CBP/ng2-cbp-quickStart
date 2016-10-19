import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DropdownTreeDemoComponent } from "./dropdown-tree-demo";
import { RadioButtonDemoComponent } from "./radio-button-demo";

const formControlDemoRoutes: Routes = [
     { path: "form-control-demo/dropdown-tree-demo", component: DropdownTreeDemoComponent },
     { path: "form-control-demo/radio-button-demo", component: RadioButtonDemoComponent }
];

export const formControlDemoRouting: ModuleWithProviders = RouterModule.forChild(formControlDemoRoutes);
