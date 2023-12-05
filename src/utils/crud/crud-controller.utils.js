import { Router } from 'express'

export class CrudControllerUtils {
  constructor () {
    this.router = Router()
    this.setupRouter()
  }

  setupRouter () {
    this.create()
    this.findAll()
    this.findOne()
    this.update()
    this.delete()
  }

  routes () {
    return this.router
  }

  create () {}

  findAll () {}

  findOne () { }

  update () {}

  delete () {}
}
