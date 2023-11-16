import { Router } from 'express'
import { AppService } from './services/app.service'

export class AppController {
  constructor () {
    this.router = Router()

    this.appService = new AppService()

    this.setupRouter()
  }

  /**
   * centralize all defined routes into a single method
   */
  setupRouter () {
    this.appInformation()
  }

  /**
   * invoke the service to obtain a response for the specified endpoint
   */
  appInformation () {
    this.router.get('/', (req, res) => {
      res.send(this.appService.responseMainRouter())
    })
  }

  /**
   * retrieve all defined routes in the controller to be set in the service
   * @return {*}
   */
  routes () {
    return this.router
  }
}
