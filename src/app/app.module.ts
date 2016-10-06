import { NgModule }                        from '@angular/core';
import { BrowserModule }                   from '@angular/platform-browser';
import { FormsModule }                     from '@angular/forms';
import { AppComponent }                    from './app.component';
import { appRouting, appRoutingProviders } from './app.routing';
import { HomeModule }                      from './home/home.module';
import { HeaderComponent }                 from '../cf/header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    appRouting,
    HomeModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
