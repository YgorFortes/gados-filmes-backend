import { CustomHttpError } from '../../../erros/custom-http.error.js';
import { CrudRepositoryUtils } from '../../../utils/crud/crud-repository.utils.js';

export class MovieRepository extends CrudRepositoryUtils {
  findMovie (titulo) {
    return this.prismaClient.movie.findFirst({
      where: {
        title: {
          contains: titulo,
          mode: 'insensitive'
        }
      }
    });
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
    });
  }

  findOne (idMovie) {
    return this.prismaClient.movie.findUnique({
      where: { id: idMovie }
    });
  }

  /**
   * Find top-rated movies based on user ratings.
   * @param {Object} filter - The filter object for querying top-rated movies.
   * @param {number} filter.limit - The number of movies to return per page
   * @param {number} filter.page - The page number for pagination.
 */
  async findTopRatedMoviesByUsers (filter) {
    const { page = 1, limit = 10 } = filter ?? {};

    if (limit > 100) {
      throw new CustomHttpError('Limite de resultados não pode exceder 100.', 400);
    }

    const movies = await this.prismaClient.movies_users.findMany({
      take: limit,
      skip: (page - 1) * limit,
      distinct: ['idfilmes'],
      orderBy: [
        {
          classificacao: 'desc'
        },
        {
          idfilmes: 'asc'
        }
      ],
      select: {
        movie: {
        },
        classificacao: true
      }
    });

    const totalCount = await this.prismaClient.movie.count();

    const counterPage = Math.ceil(totalCount / limit);

    const result = {
      items: movies,
      meta: {
        totalCount,
        counterPage
      }

    };

    return result;
  }
}
