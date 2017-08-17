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
- [ ] create deploy script tasks
- [ ] add Real-Time GraphQL with Subscription (SubscriptionManager)

## ToFix
- [x] fix run script: cause error on exit

## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website http://nicolasfazio.ch
