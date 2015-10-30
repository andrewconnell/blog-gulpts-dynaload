'use strict';

import * as express from 'express';

/**
 * Simple API endpoint used to test if the site is running
 *
 * @class
 */
export class ApiPing {

  /** @constructor */
  constructor(private app: express.Application) { }

  /**
   * Initializes the routes.
   */
  public init(): void {
    this._setupRoutes();
  }

  /**
   * Setup the routes handled by this controller.
   */
  private _setupRoutes(): void {
    this.app.get('/api/ping', this._getPing);
  }

  /** +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+- */

  /**
   * Simple heartbeat function,
   *
   * @param {object} request ExpressJS request object
   * @param {object} response ExpressJS response object
   * @param {VoidCallback} next Callback
   */
  private _getPing(request: express.Request, response: express.Response, next: IVoidCallback): void {
    /*tslint:disable:quotemark */
    let message: any = {
      "message": "pong"
    };
    /*tslint:enable:quotemark */

    response.status(200).send(message);

    next();
  }
}
