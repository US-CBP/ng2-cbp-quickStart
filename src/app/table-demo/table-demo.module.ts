import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }                  from '@angular/forms';

import { CommonFrameworkModule }        from 'ng2-cbp-cf/ng2-cbp-cf';
import { TableDemoService }             from './table-demo.service';
import { TableDemoComponent }           from './table-demo.component';
import { tableDemoRouting  }            from './table-demo.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonFrameworkModule,
    tableDemoRouting
  ],
  declarations: [
    TableDemoComponent
  ],
  providers: [
    TableDemoService
  ]
})
export class TableDemoModule {
}
