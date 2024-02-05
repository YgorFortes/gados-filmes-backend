import { CustomHttpError } from '../../../erros/customHttp.error.js';
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js';
import { MovieRepository } from '../repository/movie.repository.js';

export class MovieService extends CrudServiceUtils {
  constructor () {
    super();
    this.movieRepository = new MovieRepository();
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
