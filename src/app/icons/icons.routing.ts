import { ModuleWithProviders } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import { IconsComponent } from './icons.component';

const iconsRoutes: Routes = [
    { path: 'icons', component: IconsComponent },
];

export const iconsRouting: ModuleWithProviders = RouterModule.forChild(iconsRoutes);