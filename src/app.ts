import express from 'express';
import compression from 'compression';
import cors from 'cors';
import routes from './routes';

export class App {
  private app: express.Application
  private port: number;
  constructor() {
    this.app = express()
    this.port = Number(process.env.SERVER_PORT) || 3001;
    this.initializeMiddlewares()
    this.initializeRoutes()
  }
  public listen() {
    this.app.listen(this.port, () => {
        console.log(`
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
  }
  private initializeRoutes() {
    routes(this.app);
}
}
