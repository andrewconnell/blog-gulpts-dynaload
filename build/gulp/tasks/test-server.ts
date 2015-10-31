'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import {BuildConfig} from '../config';
import {Utils} from '../utils';
import * as yargs from 'yargs';
let $: any = require('gulp-load-plugins')({ lazy: true });

/**
 * Tests all server-side code as the gulp task 'test-server'.
 * 
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Tests all server-side code';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['build-ts'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all specs being run'
  };

  /**
   * @property  {commandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor(done: IVoidCallback) {
    super();
    Utils.log('Running server-side tests');

    // run all specs for the app
    gulp.src(BuildConfig.APP_TEST_JS)
      .pipe($.if(this._args.verbose, $.print()))
      .pipe($.mocha())    // run tests
      .on('error', Utils.handleError)
      .on('end', done);
  }

}
