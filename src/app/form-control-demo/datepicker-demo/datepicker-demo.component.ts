import {
    Component,
    OnInit,
    ViewChild,
}                           from '@angular/core';
import { MdDatepicker }     from '@angular/material';

import { ToolbarService }   from 'ng2-cbp-cf';

@Component({
    templateUrl: 'datepicker-demo.component.html',
})

export class DatepickerDemoComponent implements OnInit {
    @ViewChild('picker3') datepicker3: MdDatepicker<Date>;

    defaultDate: Date = new Date();

    constructor(private _toolbarService: ToolbarService) {
    }

    ngOnInit(): void {
        this._toolbarService.setTitle('Form Controls - Date Picker');
    }

    toggleDatepicker(): void {
        this.datepicker3.opened ? this.datepicker3.close() : this.datepicker3.open();
    }
}
