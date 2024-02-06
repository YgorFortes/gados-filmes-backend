import { number, object } from 'yup';

export class ValidateMovieSchema {
  /**
   * @param {object} reqQuery - The query object from Express request.
   *
  */

  async validateRatedMovieFilter (reqQuery) {
    const movieParamsSchemaValidate = object({
      page: number().typeError('O campo page só recebe números.').integer('O campo page só recebe números inteiros.').positive('O campo page só recebe números positivos'),
      limit: number().typeError('O campo limit só recebe números.').integer('O campo limit só recebe números inteiros.').positive('O campo limit só recebe números positivos')
    }).unknown();

    return await movieParamsSchemaValidate.validate(reqQuery);
  }
}
