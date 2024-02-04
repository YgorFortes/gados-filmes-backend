import { UserRepository } from '../repository/user.repository.js';
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js';
import { Logger } from '../../../infra/logger/logger.service.js';
import { ValidateUserSchema } from '../validators/userSchema.validator.js';
import { UtilsBcrypt } from '../../../utils/password/bcrypt.js';
import { CustomHttpError } from '../../../erros/customHttp.error.js';

export class UserService extends CrudServiceUtils {
  constructor () {
    super()
    this.userRepository = new UserRepository();
    this.validateUserSchema = new ValidateUserSchema();
    this.logger = new Logger()
  }

  async findAll () {
    return this.userRepository.findAll();
  }

  async createUser (dataUse) {
    try {
      let { senha, ...restObject } = dataUse;
      senha = await UtilsBcrypt.hashPassword(senha);
      const newUserIfHash = {
        nome: restObject.nome,
        login: restObject.login,
        email: restObject.email,
        senha
      };
      const userValidated = await this.validateUserSchema.validateUserToRegister(newUserIfHash);
      return this.userRepository.createUser(userValidated);
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
      this.logger.dispatch('error', error.message);
    }
  }
}
