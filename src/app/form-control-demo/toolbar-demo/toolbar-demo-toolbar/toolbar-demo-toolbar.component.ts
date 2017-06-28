import { Component } from '@angular/core';

@Component({
    selector: 'cbp-toolbar-demo-toolbar',
    templateUrl: 'toolbar-demo-toolbar.component.html',
    styleUrls: ['toolbar-demo-toolbar.component.scss'],
})
export class ToolbarDemoToolbarComponent {
    onSearchClicked(): void {
        alert('Search');
    }
}
