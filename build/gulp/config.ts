export class BuildConfig {
  public static CLINET: string = './src/client/';
  public static SERVER: string = './src/server/';
  public static ROOT: string = './';
  public static NODE_MODULES: string = 'node_modules';
  public static GULP_TASKS: string = './build/gulp/tasks';

  /*
   * JavaScript files
   */
  public static BUILD_JS: string[] = [
    'build/gulp/**/*.js',
    'gulpfile.js'
  ];
  public static APP_JS: string[] = [
    'src/**/*.js'
  ];
  public static APP_TEST_JS: string[] = [
    'src/**/*.spec.js'
  ];
  public static ALL_JS: string[] = BuildConfig.BUILD_JS
                                    .concat(BuildConfig.APP_JS)
                                    .concat(BuildConfig.APP_TEST_JS);

  /*
   * TypeScript files
   */
  public static BUILD_TYPESCRIPT: string[] = [
    'build/gulp/**/*.ts',
    'gulpfile.ts'
  ];
  public static APP_TYPESCRIPT: string[] = [
    'src/**/*.ts'
  ];
  public static APP_TEST_TYPESCRIPT: string[] = [
    'src/**/*.spec.ts'
  ];
  public static ALL_TYPESCRIPT: string[] = BuildConfig.BUILD_TYPESCRIPT
                                              .concat(BuildConfig.APP_TYPESCRIPT)
                                              .concat(BuildConfig.APP_TEST_TYPESCRIPT);

  /*
   * Node settings
   */
  public static NODE_SERVER: string = './src/server/server.js';
  public static LOCAL_SITE_PORT: number = 3000;

  /*
   * Nodemon settings
   */
  public static CHANGE_DELAY: number = 1;     // seconds

  /*
   * BrowserSync settings
   */
  public static BROWSERSYNC_PORT: number = 8000;
  public static BROWSER_RELOAD_DELAY: number = 1000;  // ms
}
