import jsonwebtoken from 'jsonwebtoken';
import { Logger } from '../../infra/logger/logger.service.js';
import { VerificationTokenMiddleware } from '../../middlewares/verification-token.middleware.js';
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js';
import { UserService } from './services/user.service.js';
import { ValidateUserSchema } from './validators/user-schema.validator.js';

export class UserController extends CrudControllerUtils {
  constructor () {
    super();
    this.userService = new UserService();
    this.validateUserSchema = new ValidateUserSchema();
    this.logger = new Logger();
    this.verificationToken = new VerificationTokenMiddleware();
    this.setupRouter(this.addMovieToUser());
  }

  create () {
    this.router.post('/cadastrar-usuario', async (req, res, next) => {
      try {
        const userBodyValidated = await this.validateUserSchema.validateUserToRegister(req.body);
        await this.userService.createUser({ ...userBodyValidated });
        return res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso' });
      } catch (error) {
        next(error);
        this.logger.dispatch('debug', error);
      }
    });
  }

  addMovieToUser () {
    this.router.post('/adicionar-filmes', this.verificationToken.checkAuthToken(), async (req, res, next) => {
      try {
        const bodyValidated = await this.validateUserSchema.createMovies(req.body);

        const userId = this.getIdUserFromToken(req);

        const movieAddedToUser = await this.userService.addMovieToUser(bodyValidated, userId);

        return res.status(201).send(movieAddedToUser);
      } catch (error) {
        next(error);
      }
    });
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
