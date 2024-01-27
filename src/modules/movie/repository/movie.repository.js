import { CrudRepositoryUtils } from '../../../utils/crud/crud-repository.utils.js'

export class MovieRepository extends CrudRepositoryUtils {
  findTopRatedMoviesByUsers () {
    return this.prismaClient.movies_users.findMany({
      take: 10,
      orderBy: {
        classificacao: 'desc'
      },
      select: {
        movie: {
        },
        classificacao: true
      }
    })
  }
}
