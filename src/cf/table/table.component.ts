import { Component,
    OnInit,
    SimpleChanges,
    EventEmitter,
    Output,
    Input,
    OnChanges  }        from '@angular/core';

import { Table }        from './table.model';
import { TableQuery }   from './table-query.model';
import { TablePager }   from './table-pager.model';
import { TableService } from './table.service';


@Component({
    selector: "cf-table",
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss'],
    providers: [
        TableService
    ]
})
export class TableComponent implements OnInit, OnChanges 
{
    @Input() query: TableQuery;
    @Input() data: Table;
    @Output() getpagedata: EventEmitter<TableQuery> = new EventEmitter<TableQuery>();

    pager: TablePager;
    private service: TableService;

    constructor(service: TableService) {
        this.service = service;
        this.pager = {} as TablePager;
    }

    hasNoHeader() {
        if (this.data.options && this.data.options.hasNoHeader) {
            return false;
        } else {
            return true;
        }
    }

    hasStripedAltRow() {
        if (this.data.options && this.data.options.hasStripedAltRow) {
            return true;
        } else {
            return false;
        }
    }

    updateLimit(limit) {
        if (this.query && this.query.limit && this.query.limit !== limit ) {
            this.query.limit = limit;
            this.setPage(this.query.page, true);
        }
    }

    showPagination() {
        if (this.data && this.data.totalCount > this.query.limit) {
            return true;
        } else {
            return false;
        }
    }

    showSelector() {
        if (this.data.options && this.data.options.isRowSelectable) {
            return true;
        } else {
            return false;
        }
    }
    
    setPage(page, forceRefresh) {
        if (!this.data.totalCount || page < 1 || page > this.data.totalCount) {
            return;
        }

        // get pager object from service
        this.pager =  this.service.getPager(this.data.totalCount, page, this.query.limit);

        if (this.query.page !== page || forceRefresh) {
            this.query.page = page;
            this.getpagedata.emit(this.query);
        }
        
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.query.page) {
            this.setPage(this.query.page, false);
        }

  }
}
