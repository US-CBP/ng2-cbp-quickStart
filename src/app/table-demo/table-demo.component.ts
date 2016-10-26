import { Component, OnInit }    from '@angular/core';

import { TableDemoService }         from './table-demo.service';
import { Table, Query }    from 'ng2-cbp-cf';

import * as _ from 'lodash';

@Component({
  templateUrl: 'table-demo.component.html',
  styleUrls: ['table-demo.component.scss']
})

export class TableDemoComponent implements OnInit {
    private service: TableDemoService;
    private tableData: Table;
    private tableDefault: Table;
    private tableAltRows: Table;
    private tableSelRows: Table;
    private tablePag: Table;
    private tableFloat: Table;
    private tableQuery: Query;
    private _isInit: boolean = true;

    constructor(service: TableDemoService) {
        this.service = service;
        this.tableData  = {} as Table;
        this.tableData.data = [];
        this.tableDefault = _.cloneDeep(this.tableData);
        this.tableAltRows = _.cloneDeep(this.tableData);
        this.tableSelRows = _.cloneDeep(this.tableData);
        this.tablePag = _.cloneDeep(this.tableData);
        this.tableFloat = _.cloneDeep(this.tableData);

        this.tableQuery = {} as Query;
        this.tableQuery.page = 1;
        this.tableQuery.limit = 5;
        this.tableQuery.sortBy = '-name';
        this.tableQuery.limits = [5, 10, 15, 25, 50, 100];

        this.service.getTableData().subscribe(
            (data) => {
                if(data) {
                    this.tableData = data;
                    this.generatePagTable();
                    if(this._isInit) {
                        this.generateDefaultTable();
                        this.generateAltRowTable();
                        this.generateSelTable();
                        this.generateFloatTable();
                        this._isInit = false;
                    }
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

    generateDefaultTable() {
        this.tableDefault = _.cloneDeep(this.tableData);
        this.tableDefault.options.hasHeader = true;
        this.tableDefault.totalCount = 5;
    }

    generateAltRowTable() {
        this.tableAltRows = _.cloneDeep(this.tableData);
        this.tableAltRows.options.hasHeader = true;
        this.tableAltRows.options.hasStripedAltRow = true;
        this.tableAltRows.totalCount = 5;
    }

    generateSelTable() {
        this.tableSelRows = _.cloneDeep(this.tableData);
        this.tableSelRows.options.hasHeader = true;
        this.tableSelRows.options.hasStripedAltRow = true;
        this.tableSelRows.options.isRowSelectable = true;
        this.tableSelRows.totalCount = 5;
    }

    generatePagTable() {
        this.tablePag = _.cloneDeep(this.tableData);
        this.tablePag.options.hasHeader = true;
        this.tablePag.options.hasStripedAltRow = true;
        this.tablePag.options.isRowSelectable = true;
    }

    generateFloatTable() {
        this.tableFloat = _.cloneDeep(this.tableData);
        this.tableFloat.options.hasHeader = true;
        this.tableFloat.options.hasStripedAltRow = true;
        this.tableFloat.options.hasFloatingHeader = true;
        this.tableFloat.totalCount = 5;
    }
}
