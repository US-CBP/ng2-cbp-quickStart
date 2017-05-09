import {
    Component,
    OnInit,
}                               from '@angular/core';
import { ToolbarService }       from 'ng2-cbp-cf';

import { DualListDemoService }  from './dual-list.service';

@Component({
    templateUrl: 'dual-list-demo.component.html',
})
export class DualListDemoComponent implements OnInit {
    private service: DualListDemoService;

    attrToShow: string[] = ['name', 'division'];
    sort: boolean = true;
    attrToSort: string[] = ['name'];

    source: any[] = [];
    selected: any[] = [];

    constructor(
        private _toolbarService: ToolbarService,
        service: DualListDemoService) {

        this.service = service;
        this.service.callNflData();
        this.service.getNflData().subscribe(
            data => {
                if(data) {
                    this.source = data;
                }
            },
        );
    };

    ngOnInit(): void {
        this._toolbarService.setTitle('Dual List');
    }

    selectlistChange(evt: Event): void {
    }
}
