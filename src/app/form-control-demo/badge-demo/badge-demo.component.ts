import {
    Component,
    OnInit,
}                           from '@angular/core';
import { ToolbarService }   from 'ng2-cbp-cf';

@Component({
    templateUrl: 'badge-demo.component.html',
})
export class BadgeDemoComponent implements OnInit {
    constructor(private _toolbarService: ToolbarService) {
    }

    ngOnInit(): void {
        this._toolbarService.setTitle('Badge');
    }
}
