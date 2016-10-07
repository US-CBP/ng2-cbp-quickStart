import { Component } from '@angular/core';

import { AppService }     from './app.service';
import { Header }            from '../cf';


@Component({
  selector: 'app',
  template: `
    <header class="header">
      <cf-header [data]="headerData"></cf-header>
    </header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
    private service: AppService;

    headerData: Header;

    constructor(service: AppService) {
        this.service = service;
        this.headerData = {} as Header;
        this.headerData.cbpMenu = [];
        this.headerData.appMenu = [];
        this.headerData.userMenu = [];

        this.service.getHeaderData().subscribe(
            (data) => { 
                if (data) {
                    this.headerData = data;
                }
            }
        );
    }
}
