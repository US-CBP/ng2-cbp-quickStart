import { Component } from '@angular/core';


@Component({
  selector: 'app',
  template: `
    <header class="header">
      <cf-header></cf-header>
    </header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `
})

export class AppComponent {}
