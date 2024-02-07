import { CustomHttpError } from '../../../erros/custom-http.error.js';
import { Logger } from '../../../infra/logger/logger.service.js';
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js';
import { MovieRepository } from '../repository/movie.repository.js';
import { OmdbService } from './omdb.service.js';

export class MovieService extends CrudServiceUtils {
  constructor () {
    super();
    this.movieRepository = new MovieRepository();
    this.logger = new Logger(MovieService.name);
    this.omdbService = new OmdbService();
  }

  async findMovie (titulo) {
    try {
      const movie = await this.movieRepository.findMovie(titulo);
      if (!movie) {
        const responseOmdbCreateMovie = await this.omdbService.createMovieOmdb(titulo);
        if (!responseOmdbCreateMovie) {
          const mensagem = { mensagem: 'Filme não encontrado.' };
          return mensagem;
        }
        const movie = await this.movieRepository.findMovie(titulo);
        return movie;
      }
      return movie;
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
    }
  }

  /**
   * Find top-rated movies based on user ratings.
   * @param {Object} filter - The filter object for querying top-rated movies.
   * @param {number} filter.limit - The number of movies to return per page
   * @param {number} filter.page - The page number for pagination.
 */
  async findTopRatedMoviesByUsers (filter) {
    try {
      return await this.movieRepository.findTopRatedMoviesByUsers({ ...filter });
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
    }
  }
}
