import { MovieRepository } from '../repository/movie.repository.js'
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js'
import { CustomHttpError } from '../../../erros/custom.http.error.js'

export class MovieService extends CrudServiceUtils {
  constructor () {
    super()
    this.movieRepository = new MovieRepository()
  }

  async findTopRatedMoviesByUsers () {
    try {
      const topMoviesRatingsUsers = await this.movieRepository.findTopRatedMoviesByUsers()

      return topMoviesRatingsUsers
    } catch (error) {
      CustomHttpError.checkAndThrowError(error)
    }
  }
}
