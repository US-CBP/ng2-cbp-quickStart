import {
    Component,
    OnInit,
}                           from '@angular/core';
import { ToolbarService }   from 'ng2-cbp-cf';

@Component({
    templateUrl: 'checkbox-demo.component.html',
})
export class CheckboxDemoComponent implements OnInit {
    demo1Model: boolean = true;
    demo2Model: boolean = false;
    demo3Model: boolean = null;
    demo4Model: boolean = false;
    demo5Model: boolean = true;
    demo6Model: boolean = false;
    demo7Model: boolean = false;

    constructor(private _toolbarService: ToolbarService) {
    }

    ngOnInit(): void {
        this._toolbarService.setTitle('Checkbox');
    }
}
