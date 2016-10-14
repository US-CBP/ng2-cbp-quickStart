import { Component,
    OnInit,
    SimpleChanges,
    EventEmitter,
    Output,
    Input  }       from '@angular/core';


import { Query }   from './pagination-query.model';
import { Pager }   from './pagination-pager.model';
import { PaginationService } from './pagination.service';

let nextId = 1;

@Component({
    selector: "cf-pagination",
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss'],
    providers: [
        PaginationService
    ]
})
export class PaginationComponent implements OnInit 
{
    @Input() id: string = `cf-pagination-${nextId++}`;
    @Output() getpagedata: EventEmitter<Query> = new EventEmitter<Query>();

    pager: Pager;
    private service: PaginationService;

    private _totalCount: number = null;
    private _query: Query = null;

    constructor(service: PaginationService) {
        this.service = service;
        this.pager = {} as Pager;
    }

    updateLimit(limit:number) {
        let qy:Query = this.query;
        if (qy && qy.limit && qy.limit !== limit ) {
            qy.limit = limit;
            this.setPage(qy.page, true);
        }
    }

    showPagination() {
        let tc = this.totalCount;
        let qy = this.query;
        if (tc && tc > qy.limit) {
            return true;
        } else {
            return false;
        }
    }

    setPage(page, forceRefresh:boolean = false) {
        let tc = this.totalCount;
        if (!tc || page < 1 || page > tc) {
            return;
        }

        // get pager object from service
        let qy = this.query;
        this.pager =  this.service.getPager(tc, page, qy.limit);

        if (qy.page !== page || forceRefresh) {
            qy.page = page;
            this.getpagedata.emit(qy);
        }
    }

    get totalCount(): number{
        return this._totalCount;
    }
    set totalCount(tc:number) {
        this._totalCount = tc;
        this.setPage(this.query.page, false);
    }

    @Input()
    get query(): Query {
        return this._query;
    }
    set query(qy: Query) {
        this._query = qy;
    }

    ngOnInit() {
        this.getpagedata.emit(this.query);
    }

}
