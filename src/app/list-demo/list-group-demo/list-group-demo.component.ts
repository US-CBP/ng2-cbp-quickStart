import { Component }            from '@angular/core';
import { ToolbarService }       from 'ng2-cbp-cf/src/toolbar';

@Component({
    templateUrl: 'list-group-demo.component.html',
})
export class ListGroupDemoComponent {
    constructor(private _toolbarService: ToolbarService) {
        this._toolbarService.setTitle('List Group');
    }
}
