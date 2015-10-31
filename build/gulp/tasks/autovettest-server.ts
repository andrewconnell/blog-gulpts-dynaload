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
  public static description: string = 'Auto-vets & tests all server-side code when any TypeScript changes';

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['avt'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all specs being run'
  };

  /** @constructor */
  constructor() {
    super();
    Utils.log('STARTUP: auto vet, build & test server TypeScript files on file changes');

    gulp.watch(BuildConfig.ALL_TYPESCRIPT, () => {
        runSequence('vet-ts', 'build-ts', 'test-server');
      }
    );
  }

}
