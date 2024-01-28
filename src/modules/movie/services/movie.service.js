import { MovieRepository } from '../repository/movie.repository.js'
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js'
import { CustomHttpError } from '../../../erros/custom.http.error.js'
import { Logger } from '../../../infra/logger/logger.service.js'
import { OmdbService } from './omdb.service.js'

export class MovieService extends CrudServiceUtils {
  constructor () {
    super()
    this.movieRepository = new MovieRepository()
    this.logger = new Logger(MovieService.name)
    this.omdbService = new OmdbService()
  }

  async findMovie (titulo) {
    try {
      const movie = await this.movieRepository.findMovie(titulo)
      if (!movie) {
        const responseOmdbCreateMovie = await this.omdbService.createMovieOmdb(titulo)
        if (!responseOmdbCreateMovie) {
          const mensagem = { mensagem: 'Filme não encontrado.' }
          return mensagem
        }
        const movie = await this.movieRepository.findMovie(titulo)
        return movie
      }
      return movie
    } catch (error) {
      CustomHttpError.checkAndThrowError(error)
    }
  }
}
