'use strict';

import {BuildConfig} from './config';
import {Utils} from './utils';
import * as browserSync from 'browser-sync';
import * as yargs from 'yargs';
let $: any = require('gulp-load-plugins')({ lazy: true });

export class LocalServer {
  public static args: ICommandLineArgs = yargs.argv;

  /**
   * serve the code
   * --debug-brk or --debug
   * --nosync
   * @param  {Boolean} isDev - dev or build mode
   */
  public static serve(isDev: boolean): void {
    let debug: boolean = this.args.debug || this.args.debugBrk;
    let debugMode: string = this.args.debug ? '--debug' : this.args.debugBrk ? '--debug-brk' : '';
    let nodeOptions: INodemonOptions = LocalServer.getNodeOptions(isDev);

    if (debug) {
      LocalServer.runNodeInspector();
      nodeOptions.nodeArgs = [debugMode + '=5858'];
    }

    if (this.args.verbose) {
      console.log(nodeOptions);
    }

    return $.nodemon(nodeOptions)
      .on('restart', (ev: string[]) => {
        Utils.log('*** nodemon restarted');
        Utils.log('files changed:\n' + ev);
        /*tslint:disable:align */
        setTimeout(() => {
          browserSync.notify('reloading now ...');
          browserSync.reload({ stream: false });
        }, BuildConfig.BROWSER_RELOAD_DELAY);
        /*tslint:enable:align */
      })
      .on('start', () => {
        Utils.log('*** nodemon started');
        LocalServer.startBrowserSync(isDev);
      })
      .on('crash', () => {
        Utils.log('*** nodemon crashed: script crashed for some reason');
      })
      .on('exit', () => {
        Utils.log('*** nodemon exited cleanly');
      });
  }

  /**
   * Retrieves the options for starting the node server.
   * 
   * @param  {Boolean} isDev - dev or build mode
   */
  public static getNodeOptions(isDev: boolean): INodemonOptions {
    return {
      script: BuildConfig.NODE_SERVER,
      delayTime: BuildConfig.CHANGE_DELAY,
      env: {
        PORT: BuildConfig.BROWSERSYNC_PORT,
        NODE_ENV: isDev ? 'dev' : 'build',
        DEBUG: isDev ? 'app:*' : ''
      },
      watch: [BuildConfig.SERVER]
    };
  }


  /**
   * Launches Node-Inspector.
   */
  public static runNodeInspector(): void {
    Utils.log('Running node-inspector.');
    Utils.log('Browse to http://localhost:8080/debug?port=5858');
    let exec: Function = require('child_process').exec;
    exec('node-inspector');
  }


  /**
   * Start BrowserSync
   * --nosync will avoid browserSync
   *
   * @param  {Boolean} isDev - dev or build mode
   */
  public static startBrowserSync(isDev: boolean): void {
    if (this.args.nosync || browserSync.active) {
      return;
    }

    Utils.log('Starting BrowserSync on port ' + BuildConfig.BROWSERSYNC_PORT);

    let options: IBrowserSyncOptions = {
      proxy: 'localhost:' + BuildConfig.BROWSERSYNC_PORT,
      port: BuildConfig.LOCAL_SITE_PORT,
      files: isDev ? [
        BuildConfig.CLINET + '**/*.*'
      ] : [],
      ghostMode: { // these are the defaults t,f,t,t
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      notify: true,
      reloadDelay: BuildConfig.BROWSER_RELOAD_DELAY
    };

    browserSync(options);
  }

}
