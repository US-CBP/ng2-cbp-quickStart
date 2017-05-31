import { Component, OnInit, ViewChild } from '@angular/core';
import { MdRadioChange, MdSidenav }     from '@angular/material';
import { Observable }                   from 'rxjs';

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

    @ViewChild('rightSideToolbar') sideBar: MdSidenav;

    ngOnInit(): void {
        this.$resizeEvent = Observable.fromEvent(window, 'resize')
            .debounceTime(200);

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
        let clientWidth: number = this.getWindowWidth();
        let oldValue = this.autoShowAvailable;
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

    onToggleLeftNav(event: MdRadioChange): void {
        this.leftNavOption = event.value;
    }

    onToggleRightNav(sideBar: MdSidenav): void {
        sideBar.toggle();
    }

    setRightNavValue(val: string, sideBar: MdSidenav): void {
        this.rightNavValue = val;
        if (this.leftNavOption !== 'side') {
            sideBar.close();
        }
    }

    isRightNavValuePresent(): boolean {
        return this.rightNavValue !== '';
    }
}
