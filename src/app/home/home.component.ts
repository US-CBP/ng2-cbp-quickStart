import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
}                           from '@angular/core';
import {
    ToolbarService,
    ToolbarTemplatePortalDirective,
}                           from 'ng2-cbp-cf';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('toolbarPortal') toolbarPortal: ToolbarTemplatePortalDirective;

    constructor(private _toolbarService: ToolbarService) {
    }

    ngOnInit(): void {
        this._toolbarService.setPortal(this.toolbarPortal);
    }

    ngAfterViewInit(): void {
        if(this.toolbarPortal) {
            this.toolbarPortal.detectChangesInView();
        }
    }

    ngOnDestroy(): void {
        this._toolbarService.setPortal(null);
    }
}
