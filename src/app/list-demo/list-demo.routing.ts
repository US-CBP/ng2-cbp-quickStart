import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListGroupDemoComponent } from './list-group-demo';
import { DualListDemoComponent } from './dual-list-demo';

const listDemoRoutes: Routes = [
     { path: 'list-demo/list-group-demo', component: ListGroupDemoComponent },
     { path: 'list-demo/dual-list-demo', component: DualListDemoComponent }
];

export const listDemoRouting: ModuleWithProviders = RouterModule.forChild(listDemoRoutes);
