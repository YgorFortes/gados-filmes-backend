/* eslint-disable camelcase */
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

  findOne (idUser) {
    return this.prismaClient.user.findUnique({
      where: { id: idUser }
    });
  }

  async createUser (dataUse) {
    return await this.prismaClient.user.create({
      data: {
        login: dataUse.login,
        email: dataUse.email,
        nome: dataUse.nome,
        senha: dataUse.senha
      }
    });
  }

  addMovieToUser (movieUserData, idUser) {
    const { id_filme, classificacao = null } = movieUserData ?? {};

    return this.prismaClient.movies_users.create({
      data: { id_filme, classificacao, id_usuario: idUser }
    });
  }

  findMovieUserAssociation (idMovie, idUser) {
    return this.prismaClient.movies_users.findFirst({
      where: {
        id_filme: idMovie,
        id_usuario: idUser
      }
    });
  }

  findAllMoviesUser (idUsuario, skipItens, itemsPerPage) {
    return this.prismaClient.movies_users.findMany({
      skip: skipItens,
      take: itemsPerPage,
      where: {
        idusuarios: idUsuario
      },
      select: {
        movie: {
        },
        classificacao: true
      }
    });
  }

  countMoviesUser (idUsuario) {
    return this.prismaClient.movies_users.count({
      where: {
        idusuarios: idUsuario
      }
    });
  }

  rateMovieByUser (movieData, idUser) {
    const { movieUserId, classificacao, id_filme } = movieData;
    return this.prismaClient.movies_users.update({
      where: { id: movieUserId, id_filme, id_usuario: idUser },
      data: {
        classificacao
      }
    });
  }

  deleteMovieUser (id_usuario, id_filme) {
    return this.prismaClient.movies_users.deleteMany({
      where: {
        id_usuario,
        id_filme
      }
    });
  }
}
