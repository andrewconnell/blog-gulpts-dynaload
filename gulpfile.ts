'use strict';

import * as fs from 'fs';
import {BuildConfig} from './build/gulp/config';
let gulp: any = require('gulp-help')(require('gulp'));

// load all gulp tasks (located in ./build/gulp/tasks)
fs.readdirSync(BuildConfig.GULP_TASKS)
  .filter((filename: any) => {
    return filename.match(/\.js$/i);
  })
  .map((filename: string) => {
    return <IGulpTaskFile>{
      name: filename.substr(0, filename.length - 3),
      GulpTask: require(BuildConfig.GULP_TASKS + '/' + filename).GulpTask
    };
  })
  .forEach((file: IGulpTaskFile) => {
    gulp.task(
      file.name,
      file.GulpTask.description,
      file.GulpTask.dependencies,
      file.GulpTask,
      {
        aliases: file.GulpTask.aliases,
        options: file.GulpTask.options
      }
    );
  });
