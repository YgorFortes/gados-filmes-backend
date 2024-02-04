import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js'
import { AuthService } from './services/auth.services.js'
import { AuthValidatorSchema } from './validators/authSchemma.validator.js'

export class AuthController extends CrudControllerUtils {
  constructor () {
    super()
    this.authService = new AuthService()
    this.authvalidatorSchema = new AuthValidatorSchema()
    this.setupRouter(this.login())
  }

  login () {
    this.router.post('/login', async (req, res, next) => {
      try {
        const loginBodyValidated = await this.authvalidatorSchema.login(req.body)

        const login = await this.authService.login({ ...loginBodyValidated })

        return res.status(200).send(login)
      } catch (error) {
        next(error)
      }
    })
  }
}
