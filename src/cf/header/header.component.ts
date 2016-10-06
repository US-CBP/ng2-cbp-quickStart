import { Component, OnInit } from '@angular/core';
import { HeaderService }     from './header.service';
import { Header }            from './header.model';

@Component({
    selector: "cf-header",
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
    private header: Header
    constructor(private service: HeaderService) {
        service.getHeaderData().subscribe( data => this.header = data);
    }

    ngOnInit() {

    }
}
