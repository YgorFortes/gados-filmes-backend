import { UserService } from './services/user.service.js'
import { UserValidatorSchema } from './validators/validator.schema.js'
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js'

export class UserController extends CrudControllerUtils {
  constructor () {
    super()

    this.userService = new UserService()

    this.validators = new UserValidatorSchema()
  }

  create () {
    this.router.post('/cadastrarusuario', async (req, res, next) => {
      try {
        const userBodyValidated = await this.validators.registerUser(req.body)
        await this.userService.createUser({ ...userBodyValidated })
        return res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso' })
      } catch (error) {
      }
    })
  }
}
