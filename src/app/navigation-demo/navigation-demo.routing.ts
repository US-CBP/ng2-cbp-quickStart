import { ModuleWithProviders }      from '@angular/core';
import {
    RouterModule,
    Routes,
}                                   from '@angular/router';

import { NavExampleComponent }      from './nav-example';
import { SideBarsDemoComponent }    from './side-bars-demo';
import { TabsDemoComponent }        from './tabs-demo';

const navRoutes: Routes = [
    { path: 'navigation-demo/side-bars-demo', component: SideBarsDemoComponent },
    { path: 'navigation-demo/tabs-demo', component: TabsDemoComponent },
    { path: 'navigation-demo/nav-example', component: NavExampleComponent},
];

export const navigationDemoRouting: ModuleWithProviders = RouterModule.forChild(navRoutes);
