import { Injectable }            from '@angular/core';

import { Pager }   from './pagination-pager.model';

const _ = require('lodash');

@Injectable()
export class PaginationService {

    constructor() { 
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 5) {
            // less than 10 total pages so show all
            startPage = 2;
            endPage = totalPages - 1;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 3) {
                startPage = 2;
                endPage = 6;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages - 1;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        let pager = {} as Pager;
        pager.totalItems = totalItems;
        pager.currentPage = currentPage;
        pager.pageSize = pageSize;
        pager.totalPages = totalPages;
        pager.startPage = startPage;
        pager.endPage = endPage;
        pager.startIndex = startIndex;
        pager.endIndex = endIndex;
        pager.pages = pages;

        return pager;
    }
}