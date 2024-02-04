import jsonwebtoken from 'jsonwebtoken'
import { CustomHttpError } from '../../../erros/custom.http.error.js'
import { Logger } from '../../../infra/logger/logger.service.js'
export class UtilsAuth {
  constructor(){
    this.logger = new Logger(UtilsAuth.name)
  }
  createToken (id) {
    try {
      if (!id) {
        this.logger.dispatch('error','Erro ao criar o token - O ID não foi fornecido como parâmetro.')
        throw new CustomHttpError('Erro ao criar o token.')
      }

      const payload = { id }

      const secretKey = process.env.SECRET

      const token = jsonwebtoken.sign(payload, secretKey, { expiresIn: '8h' })

      return token
    } catch (error) {
      this.logger.dispatch('error', `Erro durante a criação do token: ${error.message}`)
      CustomHttpError.checkAndThrowError(error)
    }
  }
}
