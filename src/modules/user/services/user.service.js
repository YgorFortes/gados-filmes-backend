import { UserRepository } from '../repository/user.repository.js'
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js'
import { ValidateUserSchema } from '../validators/validator.schema.js'
import { UtilsBcrypt } from '../utils/bcrypt.js'
import { Logger } from '../../../infra/logger/logger.service.js'
import { CustomHttpError } from '../../../erros/custom.http.error.js'

export class UserService extends CrudServiceUtils {
  constructor () {
    super()
    this.userRepository = new UserRepository()
    this.validateUserSchema = new ValidateUserSchema()
    this.logger = new Logger()
    this.logger = new Logger()
  }

  async findAll () {
    return this.userRepository.findAll()
  }

  async createUser (dataUse) {
    try {
      const { senha, ...restObject } = dataUse
      const hash = await UtilsBcrypt.hashPassword(senha)
      const newUserIfHash = {
        nome: restObject.nome,
        login: restObject.login,
        email: restObject.email,
        senha: hash
      }
      const userValidated = await this.validateUserSchema.validateUserToRegister(newUserIfHash)
      return this.userRepository.createUser(userValidated)
    } catch (error) {
      CustomHttpError.checkAndThrowError(error)
      this.logger.dispatch('error', error.message)
    }
  }
}
