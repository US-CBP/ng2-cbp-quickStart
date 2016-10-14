import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableDemoComponent } from './table-demo.component';

const tableDemoRoutes: Routes = [
     { path: 'table', component: TableDemoComponent }
];

export const tableDemoRouting: ModuleWithProviders = RouterModule.forChild(tableDemoRoutes);
