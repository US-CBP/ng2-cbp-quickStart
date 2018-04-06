import { TemplatePortalDirective }  from '@angular/cdk/portal';
import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
}                                   from '@angular/core';

import { ToolbarService }           from 'ng2-cbp-cf/src/toolbar';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild('toolbarPortal') toolbarPortal: TemplatePortalDirective;

    constructor(private _toolbarService: ToolbarService) { }

    ngOnInit(): void {
        this._toolbarService.setPortal(this.toolbarPortal);
    }

    ngOnDestroy(): void {
        this._toolbarService.setPortal(null);
    }
}
