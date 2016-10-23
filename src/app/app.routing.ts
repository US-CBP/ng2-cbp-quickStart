import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
