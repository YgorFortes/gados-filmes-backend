import { Router } from 'express'
import { AppController } from './modules/app/app.controller'
import { UserController } from './modules/user/user.controller'

export class DynamicsRoutes {
  constructor () {
    this.router = Router()
  }

  /**
   * integrate routes in the service based on controllers
   */
  setupRoutes () {
    const appController = new AppController()
    const userController = new UserController()

    this.router.use('/', appController.routes())

    this.router.use('/user', userController.routes())
  }

  /**
   * integrate all routes in the instance service
   * @param app
   */
  attachToApp (app) {
    app.use('/api/v1', this.router)
  }
}
