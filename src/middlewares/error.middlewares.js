import yup from 'yup'
import { CustomHttpError } from '../erros/custom.http.error.js'
import { Logger } from '../infra/logger/logger.service.js'
export class ErrorMiddlewares {
  constructor () {
    this.logger = new Logger(ErrorMiddlewares.name)
  }

  handleRequestErrors () {
    return (error, req, res, next) => {
      if (error instanceof yup.ValidationError) {
        this.logger.dispatch('warn', `Erro de validação: ${error.message}, Endpoint: ${req.path}`)
        return res.status(400).send({ mensagem: error.message })
      }

      if (error instanceof CustomHttpError) {
        this.logger.dispatch('error', `Erro personalizado: ${error.message}, Endpoint: ${req.path}`)
        return res.status(error.statusCode).send({ mensagem: error.message })
      }

      if (error instanceof Error) {
        this.logger.dispatch('error', `Erro interno do servidor: ${error.message}, Endpoint: ${req.path}`)
        return res.status(500).send({ mensagem: 'Servidor com problemas! Volte mais tarde.' })
      }
    }
  }

  handleErro404 () {
    return (req, res) => res.status(404).json({ mensagem: 'Desculpe, a página que você está procurando não foi encontrada.' })
  }
}
