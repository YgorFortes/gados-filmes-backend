import { object, string } from 'yup';

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
}
