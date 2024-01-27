import { MovieService } from './services/movie.services.js'
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js'

export class HomeController extends CrudControllerUtils {
  constructor () {
    super()

    this.movieService = new MovieService()
    this.setupRouter(this.home())
  }

  async home () {
    this.router.get('/home', async (req, res, next) => {
      try {
        const topMoviesRatingsUsers = await this.movieService.findTopRatedMoviesByUsers()

        return res.status(200).send(topMoviesRatingsUsers)
      } catch (error) {
        next(error)
      }
    })
  }
}
