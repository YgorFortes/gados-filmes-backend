import { Router } from 'express'
import { AppController } from './modules/app/app.controller'

export class DynamicsRoutes {
  constructor () {
    this.router = Router()
  }

  setupRoutes () {
    const appController = new AppController()

    const baseUrl = '/v1/'

    this.router.use(`${baseUrl}`, appController.routes())
  }

  attachToApp (app) {
    app.use('/api', this.router)
  }
}
