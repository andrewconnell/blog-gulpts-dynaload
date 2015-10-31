Sample project used as a demonstration example in this blog post: **[Dynamically Loading Gulp Tasks For Simplified Reuse and Maintenance](http://www.andrewconnell.com/blog/dynamically-loading-gulp-tasks-for-simplified-reuse-and-maintenance)**

## global installs needed

- npm
- typescript
- tsd
- gulp
- nodemon (*just to run the web server in the example... not required*)
- node-inspector (*just to run the web server in the example... not required*)

## to run local dev

compile all build related typescript using typescript compiler

  ```
  $ tsc -p ./
  ```

  This will use the `tsconfig.json` to load all settings and build all typescript files... this is required as the gulp tasks and build config files are all written in typescript so you can't use gulp to build typescript on the initial update. Building typescript this way is only required the first time running the project or when any changes to the `config.ts` or `gulpfile.ts` changes.

## Build Setup
All gulp tasks are located in `/build/gulp/tasks` & common utilities are in `/build/gulp/*.ts`. The gulp tasks are loaded on demand, each time gulp is run.
