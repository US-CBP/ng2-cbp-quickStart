import { ModuleWithProviders }          from '@angular/core';
import {
    RouterModule,
    Routes,
}                                       from '@angular/router';

import { CheckboxDemoComponent }        from './checkbox-demo';
import { DropdownTreeDemoComponent }    from './dropdown-tree-demo';

const formControlDemoRoutes: Routes = [
     { path: 'form-control-demo/checkbox-demo', component: CheckboxDemoComponent },
     { path: 'form-control-demo/dropdown-tree-demo', component: DropdownTreeDemoComponent },
];

export const formControlDemoRouting: ModuleWithProviders = RouterModule.forChild(formControlDemoRoutes);
