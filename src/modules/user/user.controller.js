import { UserService } from './services/user.service.js'
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js'
import { Logger } from '../../infra/logger/logger.service.js'
import { ValidateUserSchema } from './validators/userSchema.validator.js'

export class UserController extends CrudControllerUtils {
  constructor () {
    super()
    this.userService = new UserService()
    this.validateUserSchema = new ValidateUserSchema()
    this.logger = new Logger()
  }

  create () {
    this.router.post('/cadastrarusuario', async (req, res, next) => {
      try {
        const userBodyValidated = await this.validateUserSchema.validateUserToRegister(req.body)
        await this.userService.createUser({ ...userBodyValidated })
        return res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso' })
      } catch (error) {
        next(error)
        this.logger.dispatch('debug', error)
      }
    })
  }
}
