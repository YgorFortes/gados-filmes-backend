import { UserService } from './services/user.service'
import { ValidatorSchema } from './validators/validator.schema'
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils'

export class UserController extends CrudControllerUtils {
  constructor () {
    super()

    this.userService = new UserService()

    this.validators = new ValidatorSchema()
  }

  create () {
    this.router.get('/', (req, res) => {
      res.send({ message: 'this is my message' })
    })
  }
}
