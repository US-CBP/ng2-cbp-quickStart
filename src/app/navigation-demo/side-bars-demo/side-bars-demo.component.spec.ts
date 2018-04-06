
import {
    ComponentFixture,
    TestBed,
    async,
}                                   from '@angular/core/testing';

import { MatSidenav }              from '@angular/material';
import { NavigationDemoModule }     from '../navigation-demo.module';
import { SideBarsDemoComponent }    from './side-bars-demo.component';

describe('SideBarsDemoComponent', () => {
    let comp: SideBarsDemoComponent;
    let spiedComp: any;
    let fixture: ComponentFixture<SideBarsDemoComponent>;
    let sideNav: MatSidenav;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ NavigationDemoModule ],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SideBarsDemoComponent);
        comp = fixture.componentInstance;
        sideNav = TestBed.createComponent(MatSidenav).componentInstance;

        comp.sideBar = sideNav;

        if(spiedComp) { }
    });

    describe('Confirm autoshow works', () => {
        it('Starts closed', () => {
            expect(sideNav.opened).toEqual(false);
        });

        it('Opens and closes when window is resized', () => {
            let w: number = comp.autoShowWidth + 1;
            function width(): number {
                return w;
            }
            spiedComp = spyOn(comp, 'getWindowWidth').and.callFake(width);
            comp.checkAutoShow();
            expect(sideNav.opened).toEqual(true);
            w = comp.autoShowWidth - 1;
            comp.checkAutoShow();
            expect(sideNav.opened).toEqual(false);
        });

    });

    describe('Confirm autoshow is ignorable', () => {
        it('Starts closed', () => {
            expect(sideNav.opened).toEqual(false);
        });

        it('Opens and closes when window is resized', () => {
            comp.forceAutoShow = false;
            const w: number = comp.autoShowWidth + 1;
            function width(): number {
                return w;
            }
            spiedComp = spyOn(comp, 'getWindowWidth').and.callFake(width);
            comp.checkAutoShow();
            expect(sideNav.opened).toEqual(false);
        });
    });
});
