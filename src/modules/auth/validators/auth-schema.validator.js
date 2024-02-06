import { object, string } from 'yup';

export class AuthValidatorSchema {
  async login (value) {
    const authSchema = object({
      login: string().trim().matches(/^[^\s]+$/, 'O campo login não pode conter espaços entre os caracteres.'),
      email: string().email('O campo precisa ser um email válido.').trim().lowercase(),
      senha: string().trim().required('O campo senha é obrigatório.').matches(/^[^\s]+$/, 'O campo senha não pode conter espaços entre os caracteres.')
    }).test('emailOrLogin', 'Deve fornecer email ou login.', (body) => Boolean(body.login || body.email)).noUnknown();

    return await authSchema.validate(value);
  };
}
