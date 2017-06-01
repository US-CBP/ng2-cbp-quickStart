import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
}            from '@angular/core';
import { SECTIONS, Section }    from './section-content.model';

import {
    ToolbarService,
    ToolbarTemplatePortalDirective,
} from 'ng2-cbp-cf';

@Component({
    templateUrl: 'tabs-demo.component.html',
})
export class TabsDemoComponent implements OnInit, AfterViewInit, OnDestroy {
    sections: Section[] = SECTIONS;
    tabsVisible: boolean = true;

    @ViewChild('toolbarPortal') toolbarPortal: ToolbarTemplatePortalDirective;

    constructor(private _toolbarService: ToolbarService) {}

    ngOnInit(): void {
        this._toolbarService.setPortal(this.toolbarPortal);
        this._toolbarService.setTitle('Tabs');
    }

    ngAfterViewInit(): void {
        if(this.toolbarPortal) {
            this.toolbarPortal.detectChangesInView();
        }
    }

    ngOnDestroy(): void {
        this._toolbarService.setPortal(null);
    }

    onTabsVisibleChange(event: boolean): void {
        this.tabsVisible = event;
    }
}
