export interface TablePager {
    totalItems: Number;
    currentPage: Number;
    pageSize: Number;
    totalPages: Number;
    startPage: Number;
    endPage: Number;
    startIndex: Number;
    endIndex: Number;
    pages: Number[];
}