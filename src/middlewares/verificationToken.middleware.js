import jsonwebtoken from 'jsonwebtoken';
import { Logger } from '../infra/logger/logger.service.js';
import { CustomHttpError } from '../erros/customHttp.error.js';

export class VerificationTokenMiddleware {
  constructor () {
    this.logger = new Logger(VerificationTokenMiddleware.name);
  }

  checkAuthToken () {
    return (req, res, next) => {
      const tokenHeaders = req.headers.authorization;

      const token = tokenHeaders && tokenHeaders.split(' ')[1];

      if (!token) {
        this.logger.dispatch('error', 'Token não foi fornecido. Certifique-se de incluir o token no cabeçalho Authorization.');
        throw new CustomHttpError('Token não existe', 401);
      }

      try {
        const secretKey = process.env.SECRET;

        jsonwebtoken.verify(token, secretKey);

        this.logger.dispatch('normal', 'Token válido');

        next();
      } catch (error) {
        this.logger.dispatch('error', 'Erro durante a válidação do token. Certifique-se de fornecer um token válido e atualizado.');
        throw new CustomHttpError('Token inválido', 401);
      }
    };
  }
}
