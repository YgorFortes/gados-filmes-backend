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

  addMovieToUser (movieUserData, idUser) {
    const { idFilme, classificacao = null } = movieUserData ?? {};

    return this.prismaClient.movies_users.create({
      data: { idfilmes: idFilme, classificacao, idusuarios: idUser }
    });
  }

  findMovieUserAssociation (idMovie, idUser) {
    return this.prismaClient.movies_users.findFirst({
      where: {
        idfilmes: idMovie,
        idusuarios: idUser
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

  rateMovieByUser (movieData, idUse) {
    const { movieUserId, classificacao, idFilme } = movieData;
    return this.prismaClient.movies_users.update({
      where: { id: movieUserId, idfilmes: idFilme, idusuarios: idUse },
      data: {
        classificacao
      }
    });
  }

  deleteMovieUser (idusuarios, idfilmes) {
    return this.prismaClient.movies_users.deleteMany({
      where: {
        idusuarios,
        idfilmes
      }
    });
  }
}
