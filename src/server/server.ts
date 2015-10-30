'use strict';

import * as debug from 'debug';
import * as morgan from 'morgan';
import * as express from 'express';
let hbs: any = require('hbs');
import {ControllerFactory} from './controllers/controllerFactory';

// setup debug log
let debugLog: Function = debug('app:server');

let port: number = process.env.PORT || 7203;
let environment: string = process.env.NODE_ENV;

debugLog('About to start up node');
debugLog('PORT=' + port);
debugLog('NODE_ENV=' + environment);

// setup express
let app: express.Express = express();
app.use(morgan('dev'));

// setup express for views & view engine
hbs.registerPartials(__dirname + '/server/views');

// load up the controllers
/* tslint:disable:no-unused-variable */
let controllers: ControllerFactory = new ControllerFactory(app);
/* tslint:enable:no-unused-variable */

app.get('/', (req: express.Request, res: express.Response, next: IVoidCallback) => {
  debugLog('loaded route /');
  res.sendStatus(200);
  next();
});

// stand up web server
let server: any = app.listen(port);
console.log('Server running on: http://localhost:' + port);

module.exports = server;
