import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { FlexLayoutModule } from "@angular/flex-layout";

import { IconsComponent } from './icons.component';
import { iconsRouting } from './icons.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        iconsRouting,
        MaterialModule,
        FlexLayoutModule,
    ],
    declarations: [
        IconsComponent
    ],
    providers: []
})

export class IconsModule{

}