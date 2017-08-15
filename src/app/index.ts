/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-08-2017
*/

import * as express from 'express';
import * as http  from "http";
import * as bodyParser from 'body-parser';
import * as expressGraphQL from 'express-graphql';
import * as cors from 'cors';
import * as morgan from 'morgan';

// import config file
import{ CONFIG } from "./config";
// import schema file
import * as GraphQLSchema from "./graphql";
// import DB connect
import { DataBase }  from "./databases/mongoose";


export class Server{

  private app:express.Application;
  private server:http.Server;
  private root:string;
  private port:number|string|boolean;

  constructor(){
    this.app = express();
    this.server = http.createServer(this.app);
    this.config()
    this.middleware()
    this.dbConnect()
  }

  private config():void{
    // define prot & normalize value
    this.port = this.normalizePort(CONFIG.server.PORT);
    this.app
    .set( 'port', this.port )
    .disable('x-powered-by')
    // TODO: add jwt auth token
    // secret variable for jwt
    //.set('superSecret', SECRET_TOKEN_KEY)
  }
  private middleware(){
    this.app
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
          message: 'Hello World'
        });
      });
      // GraphQL API Endpoints
      this.app.use(
        '/graphql',
        expressGraphQL( () => {
          return {
            graphiql: true,
            schema: GraphQLSchema,
          }
        })
      );
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
    });
  }

}
