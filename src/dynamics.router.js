import { Router } from 'express'
import { AppController } from './modules/app/app.controller'

export class DynamicsRoutes {
  constructor () {
    this.router = Router()
  }

  /**
   * integrate routes in the service based on controllers
   */
  setupRoutes () {
    const appController = new AppController()

    this.router.use('/', appController.routes())
  }

  /**
   * integrate all routes in the instance service
   * @param app
   */
  attachToApp (app) {
    app.use('/api/v1', this.router)
  }
}
