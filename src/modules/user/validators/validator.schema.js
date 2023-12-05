import { object, string } from 'yup'

export class ValidatorSchema {
  async findAll (value) {
    const userSchema = object({
      name: string().required()
    })

    return await userSchema.validate({})
  }
}
