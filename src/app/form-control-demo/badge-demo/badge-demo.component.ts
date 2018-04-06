import { Component }        from '@angular/core';
import { ToolbarService }   from 'ng2-cbp-cf/src/toolbar';

@Component({
    templateUrl: 'badge-demo.component.html',
})
export class BadgeDemoComponent {
    constructor(private _toolbarService: ToolbarService) {
        this._toolbarService.setTitle('Badge');
    }
}
