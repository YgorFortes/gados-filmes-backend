import { UserService } from './services/user.service.js'
import { ValidatorSchema } from './validators/validator.schema.js'
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js'

export class UserController extends CrudControllerUtils {
  constructor () {
    super()

    this.userService = new UserService()

    this.validators = new ValidatorSchema()
  }

  create () {
    this.router.get('/', async (req, res) => {
      const users = await this.userService.findAll()

      return res.status(200).send(users)
    })
  }
}
