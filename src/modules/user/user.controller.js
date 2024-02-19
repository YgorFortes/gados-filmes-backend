import { Logger } from '../../infra/logger/logger.service.js';
import { VerificationTokenMiddleware } from '../../middlewares/verification-token.middleware.js';
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js';
import { UtilsUser } from '../../utils/user/user.utils.js';
import { UserService } from './services/user.service.js';
import { ValidateUserSchema } from './validators/user-schema.validator.js';

export class UserController extends CrudControllerUtils {
  constructor () {
    super();
    this.userService = new UserService();
    this.validateUserSchema = new ValidateUserSchema();
    this.logger = new Logger();
    this.verificationToken = new VerificationTokenMiddleware();
    this.userUtils = new UtilsUser();
    this.setupRouter(this.addMovieToUser(), this.findAllMoviesUser(), this.deleteMovieUser(), this.rateMovieByUser());
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

        const userId = this.userUtils.getIdUserFromToken(req);

        const movieAddedToUser = await this.userService.addMovieToUser(bodyValidated, userId);

        return res.status(201).send(movieAddedToUser);
      } catch (error) {
        next(error);
      }
    });
  }

  findAllMoviesUser () {
    this.router.get('/meus-filmes', this.verificationToken.checkAuthToken(), async (req, res, next) => {
      try {
        const pageAndItensValidated = await this.validateUserSchema.validateQueryPagination(req.query);
        const idUsuario = this.userUtils.getIdUserFromToken(req);
        const movies = await this.userService.findAllMoviesUser({ idUsuario, pageAndItensValidated });
        return res.status(200).send(movies);
      } catch (error) {
        next(error);
        this.logger.dispatch('debug', error);
      }
    });
  }

  rateMovieByUser () {
    this.router.patch('/classificar-filme/:idfilmes', this.verificationToken.checkAuthToken(), async (req, res, next) => {
      try {
        const ratingSchemaValidator = await this.validateUserSchema.rateMovieByUser(req.body, req.params);
        const idUser = this.userUtils.getIdUserFromToken(req);

        const result = await this.userService.rateMovieByUser({ ...ratingSchemaValidator }, idUser);
        return res.status(200).send(result);
      } catch (error) {
        next(error);
      }
    });
  }

  deleteMovieUser () {
    this.router.delete('/excluir-filme', this.verificationToken.checkAuthToken(), async (req, res, next) => {
      try {
        const idUsuario = this.userUtils.getIdUserFromToken(req);
        const { idfilmes } = await this.validateUserSchema.validateIdMovie(req.body);
        const movieDeleteResponse = await this.userService.deleteMovieUser(idUsuario, idfilmes);
        return res.status(200).send(movieDeleteResponse);
      } catch (error) {
        next(error);
        this.logger.dispatch('debug', error);
      }
    });
  }
}
