# NodeJS Simple GraphQL TS
<blockquote>NodeJS Simple GraphQL server with Typescript</blockquote>

## Overview
***This project is currently under development***

Testing build Typescript GraphQL server using data from MongoDB with Mongoose.


## Get Started
- `$ npm install -g typescript tsc nodemon`
- `$ npm install`
- update MongoDB path into package.json script section `"mongod": "YOUR_DB_PATH"`
- update `./src/app/config.ts` file with correct config params
- `$ npm run dev` for dev mode
- `$ npm run prod` for prod mode

## Have todo
- [x] create build.prod
- [x] add todo.mutation
- [x] create user.model; user.queries; user.mutation; user.resolver; user.type
- [x] add jwt user authentication
- [X] generate/send token to user client
- [x] add user into GraphQL Routes
- [x] refactoring GraphQL Schemas & Type to use SubscriptionManager
- [x] add Real-Time GraphQL with Subscription (SubscriptionManager)
- [ ] create deploy script tasks

## ToFix
- [x] fix run script: cause error on exit
- [ ] error TS2693: src/app/authentication.ts(27,14 + 29,18): 'Promise' only refers to a type, but is being used as a value here.
- [ ] import package.json.version value not updating in server root view `./` ??? currently displaying v.0.0.1 in place of v.0.0.4

## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website http://nicolasfazio.ch
