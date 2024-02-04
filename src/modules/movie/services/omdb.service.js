import { MovieRepository } from '../repository/movie.repository.js'
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js'
import { CustomHttpError } from '../../../erros/custom.http.error.js'
import { Logger } from '../../../infra/logger/logger.service.js'
import axios from 'axios'
import { FormatDate } from '../utils/format.date.js'

export class OmdbService extends CrudServiceUtils {
  constructor () {
    super()
    this.movieRepository = new MovieRepository()
    this.logger = new Logger(OmdbService.name)
  }

  async createMovieOmdb (titulo) {
    try {
      const url = `https://www.omdbapi.com/?t=${titulo}&apikey=${process.env.KEY_OMDB}`
      const response = await axios.get(url)
      const dataMovie = response.data
      const convertBolleanResponse = response.data.Response.toLowerCase() === 'true'
      if (!convertBolleanResponse) {
        return convertBolleanResponse
      }

      const movieWithDatesFormat = {
        imdb_id: dataMovie.imdbID,
        title: dataMovie.Title,
        rated: dataMovie.Rated,
        released: FormatDate.formatDateToBbStandard(dataMovie.Released),
        runtime: dataMovie.Runtime,
        genre: dataMovie.Genre,
        director: dataMovie.Director,
        writer: dataMovie.Writer,
        actors: dataMovie.Actors,
        plot: dataMovie.Plot,
        language: dataMovie.Language,
        country: dataMovie.Country,
        awards: dataMovie.Awards,
        poster: dataMovie.Poster,
        metascore: dataMovie.Metascore,
        imdb_rating: dataMovie.imdbRating,
        imdb_votes: dataMovie.imdbVotes,
        type: dataMovie.Type
      }
      return await this.movieRepository.createMovie(movieWithDatesFormat)
    } catch (error) {
      CustomHttpError.checkAndThrowError(error)
    }
  }
}
