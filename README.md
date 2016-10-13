BEMS-SEED-PROJECT-ANGULAR2

# Angular2 and ngrx/store with Common Framework
    RxJS powered state management inspired by Redux for Angular2 apps.


Stack
-----

- Angular 2
- [ngrx/store](https://github.com/ngrx/store)
- [ngrx/effects](https://github.com/ngrx/effects)
- [ngrx/store-devtools](https://github.com/ngrx/store-devtools)
- RxJS
- SASS
- Typescript 2
- Webpack 2


Getting Started
---------------

#### Recommended
- `node >= 6`

#### Quick Start
```shell
$ git clone https://github.com/r-park/todo-angular2-ngrx.git
$ cd todo-angular2-ngrx
$ npm install
$ npm start
```


Usage
-----

|Script|Description|
|---|---|
|`npm start`|Start webpack development server @ `localhost:3000` and api server @ `localhost:3001`|
|`npm run build`|Lint, test, and build the application to `./target`|
|`npm run lint`|Lint `.ts` and `.js` files|
|`npm run lint:js`|Lint `.js` files with eslint|
|`npm run lint:ts`|Lint `.ts` files with tslint|
|`npm test`|Run unit tests with Karma and Jasmine|
|`npm run test:watch`|Run unit tests with Karma and Jasmine; watch for changes to re-run tests|


To Do
-----
- Webpack:
    1. Separate css vendor to main chunk file

- Angular2:
    1. Export the config of CF to be overwritten
    2. Be able to pass data instead of URL through a mechanism
    3. Be able to lazy load child nodes in Dropdown Tree
    4. Add disable option for Dropdown Tree
    5. Allow Dropdown Tree to open above

-SCSS:
