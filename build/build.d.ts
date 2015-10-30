/**
 * Specifies the current node web environment variables.
 * 
 * @typedef nodeEnvironment
 * @type {Object}
 * @property {number}   port      - Port where the server should run.
 * @property {number}   nodeEnv   - Setting of 'dev' or 'build' for the node environment.
 */
interface INodeEnvironment {
  PORT: number;
  NODE_ENV: string;
  DEBUG?: string;
}

/**
 * Settings for the node enviroment on startup for nodemon. 
 * 
 * @typedef nodeOptions
 * @type {Object}
 * @property {string}           script    - Relative path to the script to start the node server.
 * @property {number}           delayTime - The time nodemon should delay to restart the server.
 * @property {nodeEnvironment}  env       - Specify if the server should be dev / build.
 * @property {string[]}         watch     - What files should be monitored to restart nodemon.
 */
interface INodemonOptions {
  script: string;
  delayTime: number;
  env: INodeEnvironment;
  watch: string[];
  nodeArgs?: string[];
}

/**
 * @remarks this is only needed because the browserSync interfaces aren't exposed
 * see: https://github.com/borisyankov/DefinitelyTyped/issues/6382
 */
interface IBrowserSyncGhostModeOptions{
  clicks:boolean;
  location:boolean;
  forms:boolean;
  scroll:boolean;
}
/**
 * @remarks this is only needed because the browserSync interfaces aren't exposed
 * see: https://github.com/borisyankov/DefinitelyTyped/issues/6382
 */
interface IBrowserSyncOptions {
  proxy:string;
  port:number;
  files:string[];
  ghostMode:IBrowserSyncGhostModeOptions
  injectChanges:boolean;
  logFileChanges:boolean;
  logLevel:string;
  notify:boolean;
  reloadDelay:number;
}