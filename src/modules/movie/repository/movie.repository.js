import { CrudRepositoryUtils } from '../../../utils/crud/crud-repository.utils.js'

export class MovieRepository extends CrudRepositoryUtils {
  findMovie (titulo) {
    return this.prismaClient.movie.findFirst({
      where: {
        title: {
          contains: titulo,
          mode: 'insensitive'
        }
      }
    })
  }

  createMovie (dataMovie) {
    return this.prismaClient.movie.create({
      data: {
        imdb_id: dataMovie.imdb_id,
        title: dataMovie.title,
        rated: dataMovie.rated,
        released: dataMovie.released,
        runtime: dataMovie.runtime,
        genre: dataMovie.genre,
        director: dataMovie.director,
        writer: dataMovie.writer,
        actors: dataMovie.actors,
        plot: dataMovie.plot,
        language: dataMovie.language,
        country: dataMovie.country,
        awards: dataMovie.awards,
        poster: dataMovie.poster,
        metascore: dataMovie.metascore,
        imdb_rating: dataMovie.imdb_rating,
        imdb_votes: dataMovie.imdb_votes,
        type: dataMovie.type
      }
    })
  }
}
