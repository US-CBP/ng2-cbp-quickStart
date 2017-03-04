import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { BrowserModule }            from '@angular/platform-browser';

import { CommonFrameworkModule }    from 'ng2-cbp-cf';

import { TableDemoComponent }       from './table-demo.component';
import { tableDemoRouting  }        from './table-demo.routing';
import { TableDemoService }         from './table-demo.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonFrameworkModule,
        tableDemoRouting,
    ],
    declarations: [
        TableDemoComponent,
    ],
    providers: [
        TableDemoService,
    ],
})
export class TableDemoModule {
}
