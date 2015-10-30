'use strict';

import * as debug from 'debug';
import * as express from 'express';
import * as recursiveFiles from 'recursive-readdir';
import * as path from 'path';

// setup debug log
let debugLog: Function = debug('app:controllers');

/**
 * Factory that loads & initializes all controllers.
 *
 * @class
 */
export class ControllerFactory {

  /** @constructor */
  constructor(private app: express.Application) {
    this._loadControllers();
  }

  /**
   * Load all the controllers.
   */
  private _loadControllers(): void {
    debugLog('ControllerFactory:loadControllers()');

    let ignoreList: string[] = [
      '**/controllerFactory.js',  // ignore this controller factory
      '**/*.spec.js',             // ignore all tests
      '**/*.ts'                   // ignore all typescript
    ];

    let controllersPath: string = 'src/server/controllers';

    // load all controllers
    recursiveFiles('./' + controllersPath, ignoreList, (err: any, list: string[]) => {
      // loop through all found controllers
      list.forEach((file: string) => {
        // convert to collection of objects
        let controllers: any = list.map((filePath: string) => {
          debugLog('ControllerFactory: loading controller: ' + filePath);

          let relativeControllerPath: string = './' + filePath.replace(controllersPath + '/', '');

          return {
            name: path.basename(filePath),
            fullPath: filePath,
            contents: require(relativeControllerPath)
          };
        });

        // for each module, load it and setup it's routes
        controllers.forEach((controller: any) => {
          debugLog('ControllerFactory: loading routes for controller: ' + controller.name);

          // get the name of the class for the controller
          let className: string = Object.keys(controller.contents)[0];

          // create new instance of the controller
          let webController: any = new controller.contents[className](this.app);

          // initialize the controller (which should load the routes)
          webController.init();
        });

      });

    });
  }
}
