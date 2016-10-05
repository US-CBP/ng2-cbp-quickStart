import { Component } from '@angular/core';


@Component({
  selector: 'app',
  template: `
    <header class="header">
      <div class="g-row">
        <div class="g-col">
          <h1 class="header__title">BEMS Agular2 Quick Start</h1>
        </div>
      </div>
    </header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `
})

export class AppComponent {}
