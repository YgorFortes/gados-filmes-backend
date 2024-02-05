import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js';
import { MovieService } from './services/movie.services.js';
import { ValidateMovieSchema } from './validators/movieSchema.validator.js';

export class HomeController extends CrudControllerUtils {
  constructor () {
    super();

    this.movieService = new MovieService();
    this.validateMovieSchema = new ValidateMovieSchema();
    this.setupRouter(this.home());
  }

  async home () {
    this.router.get('/home', async (req, res, next) => {
      try {
        const filter = await this.validateMovieSchema.validateRatedMovieFilter(req.query);

        const topMoviesRatingsUsers = await this.movieService.findTopRatedMoviesByUsers({ ...filter });

        return res.status(200).send(topMoviesRatingsUsers);
      } catch (error) {
        next(error);
      }
    });
  }
}
