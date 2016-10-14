import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';

import { CommonFrameworkModule }    from './../../cf';
import { TableService }             from './table.service';
import { TableComponent }           from './table.component';
import { tableRouting  }            from './table.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonFrameworkModule,
    tableRouting
  ],
  declarations: [
    TableComponent
  ],
  providers: [
    TableService
  ]
})
export class TableModule {
}
