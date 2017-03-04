import { Injectable } from '@angular/core';

@Injectable()
export class Config {
    public apiUrl: string = 'http://localhost:3001/';
    public headerContext: string = 'getHeaderData';
    public tableContext: string = 'getTableData';
    public treeNodeContext: string = 'getTreeNodeData';
    public nflContext: string = 'getNflData';
    public payPeriodContext: string = 'getPayPeriodData';
    public payPeriodMonthContext: string = 'getPayPeriodMonthData';
}
