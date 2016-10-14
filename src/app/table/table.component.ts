import { Component, OnInit }    from '@angular/core';

import { TableService }         from './table.service';
import { Table, TableQuery }    from '../../cf';

@Component({
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})

export class TableComponent implements OnInit {
    private service: TableService;
    tableData: Table;
    tableQuery: TableQuery

    constructor(service: TableService) {
        this.service = service;
        this.tableData = {} as Table;
        this.tableData.data = [];

        this.tableQuery = {} as TableQuery;
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
        this.service.callTableData(this.tableQuery);
    }

    getData() {
        this.service.callTableData(this.tableQuery);
    }
}
