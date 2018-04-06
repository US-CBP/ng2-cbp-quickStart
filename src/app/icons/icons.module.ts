import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { MatCardModule }        from '@angular/material/card';
import { MatGridListModule }    from '@angular/material/grid-list';
import { MatIconModule }        from '@angular/material/icon';
import { BrowserModule }        from '@angular/platform-browser';

import { IconsComponent }       from './icons.component';
import { iconsRouting }         from './icons.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatGridListModule,
        iconsRouting,
    ],
    declarations: [
        IconsComponent,
    ],
    providers: [],
})

export class IconsModule {

}
