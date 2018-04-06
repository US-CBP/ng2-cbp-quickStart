import {
    Component,
    OnInit,
    ViewChild,
}                                       from '@angular/core';
import {
    MatRadioChange,
    MatSidenav,
}                                       from '@angular/material';
import { ToolbarService }               from 'ng2-cbp-cf/src/toolbar';
import {
    Observable,
    fromEvent,
}                                       from 'rxjs';
import { debounceTime }                 from 'rxjs/operators';

@Component({
    templateUrl: 'side-bars-demo.component.html',
    styleUrls: ['side-bars-demo.component.scss'],
})
export class SideBarsDemoComponent implements OnInit {

    autoShowWidth: number = 768;

    rightNavValue: string = '';

    leftNavOption: string = 'side';

    startOpened: boolean = true;

    $resizeEvent: Observable<any>;

    autoShowAvailable: boolean = false;

    forceAutoShow: boolean = true;

    @ViewChild('rightSideToolbar') sideBar: MatSidenav;

    constructor(private _toolbarService: ToolbarService) {
        this._toolbarService.setTitle('Side Bars');
    }

    ngOnInit(): void {
        this.$resizeEvent = fromEvent(window, 'resize').pipe(debounceTime(200));

        this.$resizeEvent.subscribe( () => { this.checkAutoShow(); });
        this.checkAutoShow();
    }

    checkAutoShowOptionChanged(): void {
        if (!this.forceAutoShow) {
            this.sideBar.close();
        } else {
            this.checkAutoShow();
        }
    }

    checkAutoShow(): void {
        const clientWidth: number = this.getWindowWidth();
        const oldValue = this.autoShowAvailable;
        this.autoShowAvailable = clientWidth > this.autoShowWidth;
        if (this.forceAutoShow && this.autoShowAvailable ) {
            if (!this.sideBar.opened) {
                this.sideBar.open();
            }
        } else if ( this.forceAutoShow && !this.autoShowAvailable && oldValue) {
            if (this.sideBar.opened) {
                this.sideBar.close();
            }
        }
    }

    getWindowWidth(): number {
        return document.documentElement.clientWidth;
    }

    onToggleLeftNav(event: MatRadioChange): void {
        this.leftNavOption = event.value;
    }

    onToggleRightNav(sideBar: MatSidenav): void {
        sideBar.toggle();
    }

    setRightNavValue(val: string, sideBar: MatSidenav): void {
        this.rightNavValue = val;
        if (this.leftNavOption !== 'side') {
            sideBar.close();
        }
    }

    isRightNavValuePresent(): boolean {
        return this.rightNavValue !== '';
    }
}
