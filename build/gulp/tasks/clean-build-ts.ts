'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import {BuildConfig} from '../config';
import {Utils} from '../utils';
import * as yargs from 'yargs';
let $: any = require('gulp-load-plugins')({ lazy: true });

/**
 * Removes all generated JavaScript from TypeScript used in the build as the gulp task 'clean-build-ts'.
 * 
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Removes all generated JavaScript from TypeScript used in the build';

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all TypeScript files being removed'
  };

  /**
   * @property  {commandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor() {
    super();
    Utils.log('Removing generated build JavaScript files from source tree');

    let options: gulp.SrcOptions = {
      read: false
    };

    return gulp.src(
        BuildConfig.BUILD_JS,
        options
      )
      .pipe($.if(this._args.verbose, $.print()))
      .pipe($.rimraf());
  }

}
