import { Component } from '@angular/core';

@Component({
    selector: 'cbp-home-toolbar',
    templateUrl: 'home-toolbar.component.html',
    styleUrls: ['home-toolbar.component.scss'],
})
export class HomeToolbarComponent {
    onSearchClicked(): void {
        alert('Search');
    }
}
