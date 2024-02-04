import { CrudRepositoryUtils } from '../../../utils/crud/crud-repository.utils.js';

export class UserRepository extends CrudRepositoryUtils {
  findAll () {
    return this.prismaClient.user.findMany();
  }

  findByLoginOrEmail (login, email) {
    return this.prismaClient.user.findFirst({
      where: {
        OR: [
          { login },
          { email }
        ]
      }
    });
  }

  createUser (dataUse) {
    return this.prismaClient.user.create({
      data: {
        login: dataUse.login,
        email: dataUse.email,
        nome: dataUse.nome,
        senha: dataUse.senha
      }
    });
  }
}
