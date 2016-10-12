import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DropdownTreeDemoComponent } from "./dropdown-tree-demo";

const formControlDemoRoutes: Routes = [
     { path: "form-control-demo/dropdown-tree-demo", component: DropdownTreeDemoComponent }
];

export const formControlDemoRouting: ModuleWithProviders = RouterModule.forChild(formControlDemoRoutes);
