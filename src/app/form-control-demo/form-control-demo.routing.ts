import { ModuleWithProviders }          from '@angular/core';
import {
    RouterModule,
    Routes,
}                                       from '@angular/router';

import { ButtonDemoComponent }          from './button-demo';
import { CheckboxDemoComponent }        from './checkbox-demo';
import { DropdownTreeDemoComponent }    from './dropdown-tree-demo';
import { RadioButtonDemoComponent }     from './radio-button-demo';
import { SelectDemoComponent }          from './select-demo';

const formControlDemoRoutes: Routes = [
     { path: 'form-control-demo/button-demo', component: ButtonDemoComponent },
     { path: 'form-control-demo/checkbox-demo', component: CheckboxDemoComponent },
     { path: 'form-control-demo/dropdown-tree-demo', component: DropdownTreeDemoComponent },
     { path: 'form-control-demo/radio-button-demo', component: RadioButtonDemoComponent },
     { path: 'form-control-demo/select-demo', component: SelectDemoComponent },
];

export const formControlDemoRouting: ModuleWithProviders = RouterModule.forChild(formControlDemoRoutes);
