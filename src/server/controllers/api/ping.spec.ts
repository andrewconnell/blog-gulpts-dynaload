'use strict';

import * as path from 'path';
let request: any = require('supertest');

/**
 * Test the /api/ping controller.
 */
describe('controller:api:ping', () => {
  let server: any;

  /**
   * Startup web server.
   */
  before((done: IVoidCallback) => {
    let serverPath: string = path.join(process.cwd(), '/src/server/server');

    // blow away cache if previously loaded
    delete require.cache[require.resolve(serverPath)];
    // load server
    server = require(serverPath);

    done();
  });

  /**
   * Shutdown web server.
   */
  after((done: IVoidCallback) => {
    server.close(done);
  });

  /**
   * Route /
   */
  it('responds to /', (done: IVoidCallback) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  /**
   * Route /api/ping
   */
  it('responds to /api/ping', (done: IVoidCallback) => {
    request(server)
      .get('/api/ping')
      .expect(200, { message: 'pong' }, done);
  });

});
