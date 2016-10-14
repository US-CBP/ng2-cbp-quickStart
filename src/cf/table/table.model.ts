import { TableOptions } from './table-options.model';
import { TableHeader } from './table-header.model';

export interface Table {
    options: TableOptions;
    header: TableHeader[];
    data: any[];
    totalCount: number;
}