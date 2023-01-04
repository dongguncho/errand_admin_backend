// import express from 'express';
// import apiRoute from './router/index';
// const app = express();

// app.use(express.json());	// request body를 express에서 json으로 받아 온다.
// app.use('/', apiRoute);	    // 엔드포인트에 요청이 들어오면 router 폴더로 분기한다.

// app.listen('3001', () => {
//     console.log(`
//   ################################################
//   🛡️  Server listening on port: 3001 🛡️
//   ################################################
// `);
// });

import express from 'express';
import compression from 'compression';
import cors from 'cors';

class App {
  private app: express.Application
  constructor() {
    this.app = express()
    this.config()
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:false}))
    this.app.use(compression())
    this.app.use(cors())
  }
}
