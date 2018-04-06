import { TemplatePortalDirective }  from '@angular/cdk/portal';
import {
    Component,
    OnDestroy,
    ViewChild,
}                                   from '@angular/core';

import { ToolbarService }           from 'ng2-cbp-cf/src/toolbar';

import {
    SECTIONS,
    Section,
}                                   from './section-content.model';

@Component({
    templateUrl: 'tabs-demo.component.html',
})
export class TabsDemoComponent implements OnDestroy {
    sections: Section[] = SECTIONS;
    tabsVisible: boolean = true;

    @ViewChild('toolbarPortal') toolbarPortal: TemplatePortalDirective;

    constructor(private _toolbarService: ToolbarService) {
        this._toolbarService.setPortal(this.toolbarPortal);
        this._toolbarService.setTitle('Tabs');
    }

    ngOnDestroy(): void {
        this._toolbarService.setPortal(null);
    }

    onTabsVisibleChange(event: boolean): void {
        this.tabsVisible = event;
    }
}
