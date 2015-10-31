'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import {BuildConfig} from '../config';
import {Utils} from '../utils';
import * as runSequence from 'run-sequence';

/**
 * Tests all server-side code as the gulp task 'autotest-server'.
 * 
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Tests all server-side code when any TypeScript changes';

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['at'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all specs being run'
  };

  /** @constructor */
  constructor() {
    super();
    Utils.log('STARTUP: auto build & test server TypeScript files on file changes');

    // monitor all app & test TypeScript files for changes
    let filesToWatch: string[] = BuildConfig.APP_TYPESCRIPT
                                  .concat(BuildConfig.APP_TEST_TYPESCRIPT);

    // don't run all the time... wait 2.5s before another file changes
    let options: gulp.WatchOptions = {
      interval: 2500
    };

    gulp.watch(filesToWatch, options, () => {
      runSequence('build-ts', 'test-server');
    });
  }

}
