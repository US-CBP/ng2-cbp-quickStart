import { ModuleWithProviders }      from '@angular/core';
import {
    RouterModule,
    Routes,
}                                   from '@angular/router';

import { DualListDemoComponent }    from './dual-list-demo';
import { ListGroupDemoComponent }   from './list-group-demo';

const listDemoRoutes: Routes = [
     { path: 'list-demo/list-group-demo', component: ListGroupDemoComponent },
     { path: 'list-demo/dual-list-demo', component: DualListDemoComponent },
];

export const listDemoRouting: ModuleWithProviders = RouterModule.forChild(listDemoRoutes);
