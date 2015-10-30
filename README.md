# aci-util

## global installs needed

- npm
- typescript
- gulp
- nodemon
- node-inspector

## to run local dev

1. compile all build related typescript using typescript compiler

  ```
  $ tsc -p ./
  ```
  
  This will use the `tsconfig.json` to load all settings and build all typescript files... this is required as the gulp tasks and build config files are all written in typescript so you can't use gulp to build typescript on the initial update. Building typescript this way is only required the first time running the project or when any changes to the `config.ts` or `gulpfile.ts` changes.
  
  NOTE: this does not build any of the app files, it is used to only build app files.

## Build Setup
All gulp tasks are located in `/build/gulp/tasks` & common utilities are in `/build/gulp/*.ts`. The gulp tasks are loaded on demand, each time gulp is run.
