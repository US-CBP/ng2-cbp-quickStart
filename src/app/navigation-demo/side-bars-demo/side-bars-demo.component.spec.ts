
import {
    ComponentFixture,
    TestBed,
    async,
} from '@angular/core/testing';

import { MdSidenav }     from '@angular/material';
import { NavigationDemoModule } from '../navigation-demo.module';
import { SideBarsDemoComponent } from './side-bars-demo.component';

describe('SideBarsDemoComponent', () => {
    let comp: SideBarsDemoComponent;
    let spiedComp: any;
    let fixture: ComponentFixture<SideBarsDemoComponent>;
    let sideNav: MdSidenav;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ NavigationDemoModule ],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SideBarsDemoComponent);
        comp = fixture.componentInstance;
        sideNav = TestBed.createComponent(MdSidenav).componentInstance;

        comp.sideBar = sideNav;
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
            let w: number = comp.autoShowWidth + 1;
            function width(): number {
                return w;
            }
            spiedComp = spyOn(comp, 'getWindowWidth').and.callFake(width);
            comp.checkAutoShow();
            expect(sideNav.opened).toEqual(false);
        });
    });
});
