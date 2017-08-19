/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-08-2017
*/

import * as express from 'express';
import * as http  from "http";
import * as bodyParser from 'body-parser';
import * as expressGraphQL from 'express-graphql';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import * as cors from 'cors';
import * as morgan from 'morgan';

// imports form server subscribtions
import { execute, subscribe } from 'graphql';
import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';

// import config file
import{ CONFIG } from "./config";
// import schema file
import { schemas } from "./graphql";
// import DB connect
import { DataBase }  from "./databases/mongoose";

const PACKAGE = require("../../package.json");

export class Server{

  private app:express.Application;
  private server:http.Server;
  private root:string;
  private port:number|string|boolean;
  private pubsub:PubSub;

  constructor(){
    this.app = express();
    this.server = http.createServer(this.app);
    this.pubsub = new PubSub();
    this.config()
    this.middleware()
    this.dbConnect()
  }

  private config():void{
    // define port & normalize value
    this.port = this.normalizePort(CONFIG.server.PORT);
    this.app
    .set( 'port', this.port )
    .disable('x-powered-by')
  }
  private middleware(){
    this.app
    // secret variable for jwt
    .set('superSecret', CONFIG.secretTokent)
    // use bodyParser middleware to decode json parameters
    .use( bodyParser.json({ limit: '50mb' }) )
    // use bodyParser middleware to decode urlencoded parameters
    .use( bodyParser.urlencoded({ limit: '50mb', extended: true }) )
    // use morgan to log requests to the console
    .use(morgan('dev'))
    // cors domaine origin
    .use(cors({ optionsSuccessStatus: 200 }) )
  }

  private dbConnect(){
    // Load DB connection
    DataBase.connect()
    .then(() =>{
      // Load all route
      // Server Endpoints
      //this.app.use( new ServerRoutes().routes());
      this.app.get( '/', (req, res) => {
        res.json({
          code: 200,
          message: `${PACKAGE.name} - v.${PACKAGE.version} / ${PACKAGE.description} by ${PACKAGE.author}`
        });
      });
      //GraphQL API Endpoints
      this.app
        .use(
          '/graphql',
          expressGraphQL( () => {
            return {
              graphiql: true,
              schema: schemas //GraphQLSchema,
            }
          })
        )
        //.use('/graphql', graphqlExpress({schema:schemas}))
        .use('/graphiql', graphiqlExpress({
          endpointURL: '/graphql'
        }))
    })
    .catch(error => {
      // DB connection Error => load only server route
      console.log(error)
      // Server Endpoints
      //this.app.use(new ServerRoutes().routes());
      this.app.get( '/', (req, res) => {
        res.json({
          code: 200,
          message: `Hello World - GraphQL API not available: ${error.toString()}`
        });
      });
      return error
    })
    .then(error => {
      // Then catch 404 & db error connection
      this.app.use((req, res)=>{
        console.log(error)
        let message:any[] = (error)? [{error: 'Page not found'}, {error}] : [{error: 'Page not found'}]
        res.status(404).json(message);
      })
    })
  }

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind:string = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch(error.code) {
      case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
      case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
      default:
      throw error;
    }
  }

  normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  bootstrap():void{
    this.server.on('error', this.onError);
    this.server.listen(this.port, ()=>{
      console.log("Listnening on port " + this.port)
      // TODO: Real Time SubscriptionServer
      // new SubscriptionServer(
      //   {
      //     execute,
      //     subscribe,
      //     schema: GraphQLSchema.schemas,
      //   }, {
      //     server: this.server,
      //     path: '/subscriptions',
      // });
    });
  }

}
