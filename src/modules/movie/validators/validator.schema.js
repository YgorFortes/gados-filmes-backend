import { object, string } from 'yup'

export class MovieValidatorSchema {
  async validateTitleTofindMovie (value) {
    const findMovieSchema = object({
      titulo: string().trim().required('O campo titulo é obrigatório')
    }).noUnknown()
    return await findMovieSchema.validate(value)
  }
}
