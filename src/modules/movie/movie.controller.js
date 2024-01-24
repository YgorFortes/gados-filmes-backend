import { CustomHttpError } from '../../erros/custom.http.error.js'
import { Logger } from '../../infra/logger/logger.service.js'
import { CrudControllerUtils } from '../../utils/crud/crud-controller.utils.js'

export class MovieController extends CrudControllerUtils {
  constructor () {
    super()
    this.logger = new Logger(MovieController.name)
  }

  findOne () {
    this.router.get('/filmes', async (req, res, next) => {
      try {
        res.status(200).send('Chegou na rota de pesquisar filme')
      } catch (error) {
        this.logger.dispatch('error', `Erro durante a validação da senha: ${error.message}`)
        CustomHttpError.checkAndThrowError(error)
      }
    })
  }
}
