/* eslint-disable camelcase */
import { number, object, string } from 'yup';

export class ValidateUserSchema {
  async validateUserToRegister (value) {
    const RegisterUserValidatorSchema = object({
      login: string().trim().matches(/^[^\s]+$/, 'O campo login não pode conter espaços entre os caracteres.').required('O campo login é obrigatório'),
      email: string().email('O campo precisa ser um email válido.').trim().lowercase().required('O campo email obrigatório.'),
      senha: string().trim().required('O campo senha é obrigatório.').matches(/^[^\s]+$/, 'O campo senha não pode conter espaços entre os caracteres.'),
      nome: string().trim().required('O campo nome é obrigatório.')
    }).noUnknown();
    return await RegisterUserValidatorSchema.validate(value);
  }

  /**
   * @param {object} reqBody - The body object from Express request.
   *
  */
  async createMovies (reqBody) {
    const movieBodySchameValidate = object({
      classificacao: number().typeError('O campo classificacao só recebe números.').integer('O campo classificacao só recebe números interiros.')
        .positive('O campo page só recebe números positivos.')
        .max(10, 'O campo classificacao deve ser no máximo 10.').min(1, 'O campo classificacao deve ser no mínimo 1.'),
      id_filme: number().typeError('O campo classificacao só recebe números.').integer('O campo classificacao só recebe números interiros.')
        .positive('O campo page só recebe números positivos').required('O campo idFilme é obrigatório.')
    });
    return await movieBodySchameValidate.validate(reqBody);
  }

  async validateQueryPagination (value) {
    const ValidateQueryPagination = object({
      currentPage: number().integer().typeError('O número da página deve ser um número inteiro.'),
      itemsPerPage: number().integer().typeError('A quantidade de itens por página deve ser um número válido.')
    }).noUnknown();
    return await ValidateQueryPagination.validate(value);
  }

  async validateIdMovie (value) {
    const validateIdFilmes = object({
      id_filme: number().typeError('O campo classificacao só recebe números.').integer('O campo classificacao só recebe números interiros.').positive('O campo page só recebe números positivos').required('O campo id_filme é obrigatório.')
    }).noUnknown();
    return await validateIdFilmes.validate(value);
  }

  async rateMovieByUser (reqBody, reqParams) {
    const moviePatchSchameValidate = object({
      classificacao: number().typeError('O campo classificacao só recebe números.').integer('O campo classificacao só recebe números interiros.')
        .positive('O campo page só recebe números positivos.')
        .max(10, 'O campo classificacao deve ser no máximo 10.').min(1, 'O campo classificacao deve ser no mínimo 1.').required('O campo classificacao é obrigátorio')
    });
    const classificacao = await moviePatchSchameValidate.validate(reqBody);
    const idFilme = (await this.validateIdMovie(reqParams)).id_filme;

    return { ...classificacao, id_filme: idFilme };
  }
}
