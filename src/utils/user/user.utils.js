import jsonwebtoken from 'jsonwebtoken';
import { Logger } from '../../infra/logger/logger.service.js';
export class UtilsUser {
  constructor () {
    this.logger = new Logger(UtilsUser.name);
  }

  getIdUserFromToken (req) {
    const secretKey = process.env.SECRET;

    // eslint-disable-next-line no-unused-vars
    const [_, token] = req.get('authorization').split(' ');

    const decodedToken = jsonwebtoken.verify(token, secretKey);

    const idUser = decodedToken.id;

    return idUser;
  }
}
