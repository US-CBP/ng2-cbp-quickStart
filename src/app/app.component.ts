import { Component }    from '@angular/core';

import { AppService }   from './app.service';
import { Header }       from './header-model';

@Component({
  selector: 'cbp-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
})
export class AppComponent {
    private service: AppService;

    headerData: Header;

    constructor(service: AppService) {
        this.service = service;

        this.service.getHeaderData().subscribe(
            data => {
                if(data) {
                    this.headerData = data;
                }
            },
        );
    }
}
