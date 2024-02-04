import { UserRepository } from '../modules/user/repository/user.repository.js';
import { CustomHttpError } from '../erros/customHttp.error.js';

export class CheckUserExist {
  constructor () {
    this.user = new UserRepository();
  }

  findUser () {
    return async (req, res, next) => {
      const { login, email } = req.body;
      try {
        const user = await this.user.findByLoginOrEmail(login, email);
        if (user) {
          return res.status(409).send({ mensagem: 'Já existe usuário cadastrado com esse e-mail ou login' });
        }
        next();
      } catch (error) {
        CustomHttpError.checkAndThrowError(error);
      }
    };
  }
}
