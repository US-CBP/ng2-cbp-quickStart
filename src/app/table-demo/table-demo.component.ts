import { Component, OnInit }    from '@angular/core';

import { TableDemoService }         from './table-demo.service';
import { Table, Query }    from '../../cf';

@Component({
  templateUrl: 'table-demo.component.html',
  styleUrls: ['table-demo.component.scss']
})

export class TableDemoComponent implements OnInit {
    private service: TableDemoService;
    private tableData: Table;
    private tableQuery: Query

    constructor(service: TableDemoService) {
        this.service = service;
        this.tableData = {} as Table;
        this.tableData.data = [];

        this.tableQuery = {} as Query;
        this.tableQuery.page = 1;
        this.tableQuery.limit = 5;
        this.tableQuery.sortBy = '-name';
        this.tableQuery.limits = [5,10,15,25,50,100];


        this.service.getTableData().subscribe(
            (data) => { 
                if (data) {
                    this.tableData = data;
                }
            }
        );
    }

    ngOnInit() {
    }

    getData(query) {
        this.tableQuery = query;
        this.service.callTableData(this.tableQuery);
    }
}
