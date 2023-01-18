import express from 'express';
import compression from 'compression';
import cors from 'cors';
import routes from './routes';
import session from 'express-session';
import passport from 'passport';
import { Passport } from './passport';
import logger from './config/logger';

export class App {
  private app: express.Application
  private port: number;
  private passportConfig: Passport;
  constructor() {
    this.app = express()
    this.port = Number(process.env.SERVER_PORT) || 3001;
    this.passportConfig = new Passport();
    this.initializeMiddlewares()
    this.initializeRoutes()
  }
  public listen() {
    this.app.listen(this.port, () => {
        logger.info(`
            ##########################################
            🛡️ Server listening on port: ${this.port} 🛡️
            ##########################################
        `)
    });
}

  private initializeMiddlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:false}))
    this.app.use(compression())
    this.app.use(cors())
    this.app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: 'secret-code'
  }));
  this.app.use(passport.initialize());
  this.app.use(passport.session());
  this.passportConfig.config();
  }
  private initializeRoutes() {
    routes(this.app);
}
}
