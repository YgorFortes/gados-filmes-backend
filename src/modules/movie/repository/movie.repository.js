import { CustomHttpError } from '../../../erros/customHttp.error.js';
import { CrudRepositoryUtils } from '../../../utils/crud/crud-repository.utils.js';

export class MovieRepository extends CrudRepositoryUtils {
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
