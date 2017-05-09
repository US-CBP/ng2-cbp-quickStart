import {
    Component,
    OnInit,
}                               from '@angular/core';
import { ToolbarService }       from 'ng2-cbp-cf';

@Component({
    templateUrl: 'list-group-demo.component.html',
})
export class ListGroupDemoComponent implements OnInit {
    constructor(private _toolbarService: ToolbarService) {
    }

    ngOnInit(): void {
        this._toolbarService.setTitle('List Group');
    }
}
