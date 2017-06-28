import { ModuleWithProviders }          from '@angular/core';
import {
    RouterModule,
    Routes,
}                                       from '@angular/router';

import { BadgeDemoComponent }           from './badge-demo';
import { CheckboxDemoComponent }        from './checkbox-demo';
import { DropdownTreeDemoComponent }    from './dropdown-tree-demo';
import { ToolbarDemoComponent }         from './toolbar-demo';

const formControlDemoRoutes: Routes = [
     { path: 'form-control-demo/badge-demo', component: BadgeDemoComponent },
     { path: 'form-control-demo/checkbox-demo', component: CheckboxDemoComponent },
     { path: 'form-control-demo/dropdown-tree-demo', component: DropdownTreeDemoComponent },
     { path: 'form-control-demo/toolbar-demo', component: ToolbarDemoComponent },
];

export const formControlDemoRouting: ModuleWithProviders = RouterModule.forChild(formControlDemoRoutes);
