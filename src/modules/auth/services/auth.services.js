import bcrypt from 'bcrypt';
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js';
import { UserRepository } from '../../user/repository/user.repository.js';

import { Logger } from '../../../infra/logger/logger.service.js';
import { AuthValidatorSchema } from '../validators/authSchemma.validator.js';
import { UtilsAuth } from '../../../utils/auth/auth.utils.js';
import { CustomHttpError } from '../../../erros/customHttp.error.js';

export class AuthService extends CrudServiceUtils {
  constructor () {
    super();
    this.UserRepository = new UserRepository();
    this.authValidatorSchema = new AuthValidatorSchema();
    this.utilsAuth = new UtilsAuth();
    this.logger = new Logger(AuthService.name);
  }

  async login (userData) {
    try {
      await this.authValidatorSchema.login(userData);

      const user = await this.UserRepository.findByLoginOrEmail(userData.login, userData.email);
      if (!user) {
        this.logger.dispatch('error', 'Credenciais inválidas - Usuário não encontrado');
        throw new CustomHttpError('Credenciais inválidas', 404);
      }

      await this.validatePassword(user.senha, userData.senha);

      const token = this.utilsAuth.createToken(user.id);

      this.logger.dispatch('normal', `Usuário ${user.nome} (${user.login}) logado com sucesso.`);

      return {
        usuario: { nome: user.nome, login: user.login },
        token
      };
    } catch (error) {
      this.logger.dispatch('error', `Erro durante o login: ${error.message}`);
      CustomHttpError.checkAndThrowError(error);
    }
  }

  async validatePassword (userPassword, passwordtyped) {
    try {
      const passwordValid = await bcrypt.compare(passwordtyped, userPassword);

      if (!passwordValid) {
        this.logger.dispatch('warn', 'Tentativa de login. Senha inválida');
        throw new CustomHttpError('Não autorizado', 401);
      }
    } catch (error) {
      this.logger.dispatch('error', `Erro durante a validação da senha: ${error.message}`);
      CustomHttpError.checkAndThrowError(error);
    }
  }
}
