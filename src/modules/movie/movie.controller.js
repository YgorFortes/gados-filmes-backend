import { Logger } from '../../infra/logger/logger.service.js';
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js';
import { MovieService } from './services/movie.service.js';
import { MovieValidatorSchema } from './validators/validator.schema.js';

export class MovieController extends CrudControllerUtils {
  constructor () {
    super();
    this.movieService = new MovieService();
    this.logger = new Logger(MovieController.name);
    this.validators = new MovieValidatorSchema();
  }

  findOne () {
    this.router.get('/filmes/titulo/:titulo', async (req, res, next) => {
      try {
        const titleValidated = await this.validators.validateTitleTofindMovie(req.params);
        const movie = await this.movieService.findMovie(titleValidated.titulo);
        res.status(200).send(movie);
      } catch (error) {
        next(error);
        this.logger.dispatch('debug', error.message);
      }
    });
  }
}
