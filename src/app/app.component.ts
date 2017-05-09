import {
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
}                       from '@angular/core';
import { MdSidenav }    from '@angular/material';
import {
    NavigationAction,
    Toolbar,
    ToolbarService,
}                       from 'ng2-cbp-cf';

import { AppService }   from './app.service';
import { Header }       from './header-model';

@Component({
  selector: 'cbp-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    private service: AppService;

    headerData: Header;

    @ViewChild('sideNav') sideNav: MdSidenav;

    constructor(
        private _toolbarService: ToolbarService,
        service: AppService) {

        this.service = service;

        this.service.getHeaderData().subscribe(
            data => {
                if(data) {
                    this.headerData = data;
                }
            },
        );
    }

    ngOnInit(): void {
        let toolbar = new Toolbar(
            new NavigationAction(this._toolbarService),
            null,
            'Home');

        this._toolbarService.set(toolbar);
        this._toolbarService.sideNavOpened.subscribe(() => this._openSideNav());
    }

    onRouteClicked(): void {
        this.sideNav.close();
    }

    onHelpClicked(): void {
        alert('Help');
    }

    private _openSideNav(): void {
        this.sideNav.open();
    }
}
