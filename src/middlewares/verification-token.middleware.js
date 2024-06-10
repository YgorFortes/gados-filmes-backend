import jsonwebtoken from 'jsonwebtoken';
import nodeCrom from 'node-cron';
import { CustomHttpError } from '../erros/custom-http.error.js';
import { Logger } from '../infra/logger/logger.service.js';

export class VerificationTokenMiddleware {
  static tokenInvalids = [];
  constructor () {
    this.logger = new Logger(VerificationTokenMiddleware.name);
    const MINUTES = '0'; // Execution at the beginning of every hour
    const HOUR = '9'; // Execution at 9 o'clock in the morning
    const DAY_OF_MONTH = '*'; // Execution on any day of the month
    const MONTH = '*'; // Execution in any month
    const DAY_OF_WEEK = '1'; // Execution on Monday

    nodeCrom.schedule(`${MINUTES} ${HOUR} ${DAY_OF_MONTH} ${MONTH} ${DAY_OF_WEEK}`, () => {
      this.deletokenInOneWeek();
    });
  }

  checkAuthToken () {
    return (req, res, next) => {
      const tokenHeaders = req.headers.authorization;

      if (!tokenHeaders) {
        throw new CustomHttpError('Token não existe. Certifique-se de incluir o token no cabeçalho Authorization.', 401);
      }

      // eslint-disable-next-line no-unused-vars
      const [_, token] = tokenHeaders && tokenHeaders.split(' ');

      if (!token) {
        this.logger.dispatch('error', 'Token não foi fornecido. Certifique-se de incluir o token no cabeçalho Authorization.');
        throw new CustomHttpError('Token não existe', 401);
      }

      try {
        this.verifyTokenInvalid(token);
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

  static removeToken () {
    return (req, _, next) => {
      try {
        const tokenHeaders = req.headers.authorization;

        if (!tokenHeaders) {
          throw new CustomHttpError('Token não existe. Certifique-se de incluir o token no cabeçalho Authorization.', 401);
        }

        // eslint-disable-next-line no-unused-vars
        const [_, token] = tokenHeaders && tokenHeaders.split(' ');

        VerificationTokenMiddleware.tokenInvalids.push(token);

        next();
      } catch (error) {
        throw new CustomHttpError('Token inválido', 401);
      }
    };
  }

  verifyTokenInvalid (token) {
    try {
      if (VerificationTokenMiddleware.tokenInvalids.includes(token)) {
        throw CustomHttpError('Token Invalido', 401);
      }
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
    }
  }

  deletokenInOneWeek () {
    try {
      this.tokenInvalids.splice(0, VerificationTokenMiddleware.tokenInvalids.length);
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
    }
  }
}
