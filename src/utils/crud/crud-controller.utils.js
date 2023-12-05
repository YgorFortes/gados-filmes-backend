import { ControllerUtils } from '../controller/controller.utils'

export class CrudControllerUtils extends ControllerUtils {
  setupRouter () {
    this.create()
    this.findAll()
    this.findOne()
    this.update()
    this.delete()
  }

  create () { }

  findAll () { }

  findOne () { }

  update () { }

  delete () { }
}
