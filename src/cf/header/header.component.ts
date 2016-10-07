import { Component, OnInit,
    Input }                  from '@angular/core';
import { Router }            from '@angular/router';
import { Header }            from './header.model';

@Component({
    selector: "cf-header",
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() data: Header;
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    goTo(item) {
        if (item.route) {
            this.router.navigate( [ item.route, {} ]);
        } else if (item.href) {
            window.location.href = item.href;
        }
    }

    ngOnInit() {
        console.log('init ' + this.data);
    }
}
