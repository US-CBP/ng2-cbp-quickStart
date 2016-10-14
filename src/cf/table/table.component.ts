import { Component,
    OnInit,
    EventEmitter,
    Output,
    Input,
    ViewChild }                 from '@angular/core';

import { Table }                from './table.model';
import { PaginationComponent,
    Query }                     from '../pagination';

let nextId = 1;

@Component({
    selector: "cf-table",
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss']
})
export class TableComponent implements OnInit
{
    @Input() id: string = `cf-table-${nextId++}`;
    @Output() gettabledata: EventEmitter<Query> = new EventEmitter<Query>();

    @ViewChild(PaginationComponent) pagerObj:PaginationComponent;

    private _data: Table = null;
    private _query: Query = null;

    constructor() {
    }

    @Input()
    get data(): Table {
        return this._data;
    }
    set data(dt: Table) {
        this._data = dt;
        if (dt && this.query) {
            this.pagerObj.totalCount = dt.totalCount;
            this.pagerObj.setPage(this.query.page, false);
        }
    }

    @Input()
    get query(): Query {
        return this._query;
    }
    set query(qy: Query) {
        this._query = qy;
    }

    hasNoHeader() {
        let dt = this.data;
        if (dt.options && dt.options.hasNoHeader) {
            return false;
        } else {
            return true;
        }
    }

    hasStripedAltRow() {
        let dt = this.data;
        if (dt.options && dt.options.hasStripedAltRow) {
            return true;
        } else {
            return false;
        }
    }

    showSelector() {
        let dt = this.data;
        if (dt.options && dt.options.isRowSelectable) {
            return true;
        } else {
            return false;
        }
    }

    ngOnInit() {
    }

    loadPage(query){
        this.query = query;
        this.gettabledata.emit(query);
    }

}
