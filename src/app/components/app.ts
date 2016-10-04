import { Component } from '@angular/core';


@Component({
  selector: 'app',
  styles: [
    require('./app.scss')
  ],

  template: `
    <header class="header">
      <div class="g-row">
        <div class="g-col">
          <h1 class="header__title">Todo Angular2 NgRx</h1>
          <a class="header__link" href="https://github.com/r-park/todo-angular2-ngrx"></a>
        </div>
      </div>
    </header>

    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `
})

export class AppComponent {}
