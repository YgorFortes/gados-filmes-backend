import { UserRepository } from '../repository/user.repository.js'
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js'
import { UserValidatorSchema } from '../validators/validator.schema.js'
import { CustomHttpError } from '../../../erros/custom.http.error.js'
import { UtilsBcrypt } from '../utils/bcrypt.js'

export class UserService extends CrudServiceUtils {
  constructor () {
    super()
    this.userRepository = new UserRepository()
    this.userValidatorSchema = new UserValidatorSchema()
  }

  async findAll () {
    return this.userRepository.findAll()
  }

  async createUser (dataUse) {
    try {
      const { senha, ...restObject } = dataUse
      const hash = await UtilsBcrypt.hashPassword(senha)
      console.log(hash)
      console.log(restObject)
      const newUserIfHash = {
        nome: restObject.nome,
        login: restObject.login,
        email: restObject.email,
        senha: hash
      }
      const userValidated = await this.userValidatorSchema.registerUser(newUserIfHash)
      const newUserCreated = this.userRepository.createUser(userValidated)
      return newUserCreated
    } catch (error) {
      CustomHttpError.checkAndThrowError(error)
    }
  }
}
