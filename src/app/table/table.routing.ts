import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableComponent } from './table.component';

const tableRoutes: Routes = [
     { path: 'table', component: TableComponent }
];

export const tableRouting: ModuleWithProviders = RouterModule.forChild(tableRoutes);
