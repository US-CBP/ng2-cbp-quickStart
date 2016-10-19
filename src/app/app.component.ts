import { Component } from '@angular/core';

import { AppService }     from './app.service';
//import { Header }         from 'ng2-cf/ng2-cf';


@Component({
  selector: 'app',
  template: `
    <header class="header">
      <cf-header [data]="headerData"></cf-header>
    </header>
    <main class="main container-fluid content">
      <div class="row">
        <div id="content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </main>`,
  styleUrls: ['app.scss']
})
export class AppComponent {
    private service: AppService;

    headerData: any;

    constructor(service: AppService) {
        this.service = service;
        this.headerData = {}; //as Header;
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
