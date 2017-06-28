import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
}                           from '@angular/core';
import {
    BackAction,
    CloseAction,
    NavigationAction,
    ToolbarService,
    ToolbarTemplatePortalDirective,
}                           from 'ng2-cbp-cf';

@Component({
    templateUrl: 'toolbar-demo.component.html',
})
export class ToolbarDemoComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('toolbarPortal') toolbarPortal: ToolbarTemplatePortalDirective;

    constructor(private _toolbarService: ToolbarService) {
    }

    ngOnInit(): void {
        this._toolbarService.setPortal(this.toolbarPortal);

        this._toolbarService.setTitle('Toolbar');
    }

    ngAfterViewInit(): void {
        if(this.toolbarPortal) {
            this.toolbarPortal.detectChangesInView();
        }
    }

    ngOnDestroy(): void {
        this._toolbarService.setPortal(null);
    }

    setLeftActionToBack(): void {
        this._toolbarService.setLeftAction(new BackAction(() => this._back()));
    }

    setLeftActionToClose(): void {
        this._toolbarService.setLeftAction(new CloseAction(() => this._close()));
    }

    private _setLeftActionToNavigation(): void {
        this._toolbarService.setLeftAction(new NavigationAction(this._toolbarService));
    }

    private _back(): void {
        alert('back');
        this._setLeftActionToNavigation();
    }

    private _close(): void {
        alert('close');
        this._setLeftActionToNavigation();
    }
}
