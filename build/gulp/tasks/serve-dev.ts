'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as server from '../serve';

/**
 * Launches the local webserver with nodemon, node-inspector and browsersync as the gulp task 'serve-dev'.
 * 
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Launches the local webserver with nodemon, node-inspector and browsersync';

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['sd'];

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['build-ts'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'debug': 'Launch debugger with node-inspector',
    'debug-brk': 'Launch debugger and break on 1st line with node-inspector',
    'nosync': 'Don\'t launch the browser with browser-sync when serving code',
    'verbose': 'Output nodemon settings'
  };

  /** @constructor */
  constructor(done: IVoidCallback) {
    super();
    // start server
    server.LocalServer.serve(true /* isDev */);

    // start watcher to monitor any changes in ts files & if so, recompile the typescript => js
    // todo:

    done();
  }

}
