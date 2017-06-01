import {
    Component,
    EventEmitter,
    Output,
    ViewEncapsulation,
} from '@angular/core';

import { MdTabChangeEvent } from '@angular/material';

@Component({
    templateUrl: 'tabs-demo-toolbar.component.html',
    selector: 'cbp-tabs-demo-toolbar',
    styleUrls: ['tabs-demo-toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TabsDemoToolbarComponent {
    @Output() tabsVisible: EventEmitter<boolean> = new EventEmitter();

    showTabs(): void {
        this.tabsVisible.emit(true);
    }

    hideTabs(): void {
        this.tabsVisible.emit(false);
    }

    selectionChanged(event: MdTabChangeEvent): void {
        this.tabsVisible.emit(event.tab.textLabel === 'Inner Tabs');
    }
}
