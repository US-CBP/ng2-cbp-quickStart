import { Component } from '@angular/core';

import { DualListDemoService }         from './dual-list.service';

@Component({
    templateUrl: 'dual-list-demo.component.html'
})
export class DualListDemoComponent {
    private service: DualListDemoService;

    attrToShow: string[] = ['name', 'division'];
    sort: boolean = true;
    attrToSort: string[] = ['name'];

    source: any[] = [];
    selected: any[] = [];

    constructor(service: DualListDemoService) {
        this.service = service;
        this.service.callNflData();
        this.service.getNflData().subscribe(
            (data) => {
                if(data) {
                    this.source = data;
                }
            }
        );
    };

    selectlistChange(evt) {
        console.log(evt.items);
    }
}
