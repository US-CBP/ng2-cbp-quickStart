import { NgModule }         from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule }      from '@angular/forms';
import { MaterialModule }   from '@angular/material';
import { BrowserModule }    from '@angular/platform-browser';

import { IconsComponent }   from './icons.component';
import { iconsRouting }     from './icons.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        FlexLayoutModule,
        iconsRouting,
        MaterialModule,
    ],
    declarations: [
        IconsComponent,
    ],
    providers: [],
})

export class IconsModule {

}
