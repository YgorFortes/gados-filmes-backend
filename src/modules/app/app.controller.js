import { ControllerUtils } from '../../utils/controller/controller.utils'
import { AppService } from './services/app.service'

export class AppController extends ControllerUtils {
  constructor () {
    super()

    this.appService = new AppService()
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
}
