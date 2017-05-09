                                                                                                       
                                 .d8888b.         .d8888b.  888888b.   8888888b.                       
                                d88P  Y88b       d88P  Y88b 888  "88b  888   Y88b                      
                                       888       888    888 888  .88P  888    888                      
              88888b.   .d88b.       .d88P       888        8888888K.  888   d88P                      
              888 "88b d88P"88b  .od888P"        888        888  "Y88b 8888888P"                       
              888  888 888  888 d88P"            888    888 888    888 888                             
              888  888 Y88b 888 888"             Y88b  d88P 888   d88P 888                             
              888  888  "Y88888 888888888         "Y8888P"  8888888P"  888                             
                            888                                                                        
                       Y8b d88P                                                                        
                        "Y88P"                                                                         
                                                                                                       
                                                                                                       
     .d88888b.           d8b          888             .d8888b.  888                     888            
    d88P" "Y88b          Y8P          888            d88P  Y88b 888                     888            
    888     888                       888            Y88b.      888                     888            
    888     888 888  888 888  .d8888b 888  888        "Y888b.   888888  8888b.  888d888 888888         
    888     888 888  888 888 d88P"    888 .88P           "Y88b. 888        "88b 888P"   888            
    888 Y8b 888 888  888 888 888      888888K              "888 888    .d888888 888     888            
    Y88b.Y8b88P Y88b 888 888 Y88b.    888 "88b       Y88b  d88P Y88b.  888  888 888     Y88b.          
     "Y888888"   "Y88888 888  "Y8888P 888  888        "Y8888P"   "Y888 "Y888888 888      "Y888         
           Y8b                                                                                         
                                                                                                       
                                                                                                       

This is a quick start to use the ng2-cbp-cf (Common Framewor) with Angular2 and ngrx/store
--> RxJS powered state management inspired by Redux for Angular2 apps.


Stack
-----

- Angular
- [ngrx/store](https://github.com/ngrx/store)
- [ngrx/effects](https://github.com/ngrx/effects)
- [ngrx/store-devtools](https://github.com/ngrx/store-devtools)
- RxJS
- SASS
- Typescript 2
- Webpack 2
- Karma
- Jasmine


Getting Started
---------------

#### Recommended
- `node >= 6`

#### Quick Start
```shell
$ git clone https://github.com/US-CBP/ng2-cbp-quickStart.git
$ cd ng2-cbp-quickStart
$ npm install
#open a new terminal and run the below link command if its NOT already done 
$npm link ng2-cbp-cf
#open a new terminal to launch the node server api
$ npm run server:api
#open a new terminal to launch the webpack server to show the UI
$ npm run server:dev
```
#### go to http://localhost:3000

Usage
-----

|Script|Description|
|---|---|
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
    6. Make Dropdown Tree NgModel enabled

-SCSS:
    None for now

TroubleShooting:

-Make sure to have "C:\windows\system32" in PATH. 
