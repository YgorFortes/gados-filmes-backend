import { CustomHttpError } from '../../../erros/custom-http.error.js';
import { Logger } from '../../../infra/logger/logger.service.js';
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils.js';
import { UtilsBcrypt } from '../../../utils/password/bcrypt.js';
import { AuthService } from '../../auth/services/auth.services.js';
import { MovieRepository } from '../../movie/repository/movie.repository.js';
import { UserRepository } from '../repository/user.repository.js';
import { ValidateUserSchema } from '../validators/user-schema.validator.js';

export class UserService extends CrudServiceUtils {
  constructor () {
    super();
    this.userRepository = new UserRepository();
    this.movieRepository = new MovieRepository();
    this.validateUserSchema = new ValidateUserSchema();
    this.logger = new Logger();
    this.authService = new AuthService();
  }

  async findAll () {
    return this.userRepository.findAll();
  }

  async createUser (dataUse) {
    try {
      const { senha, ...restObject } = dataUse;
      const senhaHash = await UtilsBcrypt.hashPassword(senha);
      const newUserIfHash = {
        nome: restObject.nome,
        login: restObject.login,
        email: restObject.email,
        senha: senhaHash
      };
      const userValidated = await this.validateUserSchema.validateUserToRegister(newUserIfHash);
      const newUser = await this.userRepository.createUser(userValidated);
      const newUserWithoutHash = {
        login: newUserIfHash.login,
        senha
      };
      const { token } = await this.authService.login(newUserWithoutHash);
      return { newUser, token };
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
      this.logger.dispatch('error', error.message);
    }
  }

  async findOne (idUser) {
    try {
      const user = await this.userRepository.findOne(idUser);
      if (!user) {
        throw new CustomHttpError('Usuário não encontrado', 200);
      }

      return user;
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
    }
  }

  async addMovieToUser (movieUserData, idUser) {
    try {
      await this.validateUserSchema.createMovies(movieUserData);

      await this.findOne(idUser);

      const movie = await this.movieRepository.findOne(movieUserData.idFilme);

      if (!movie) {
        throw new CustomHttpError('Filme não encontrado', 200);
      }

      await this.verifyMovieUserAssociation(movieUserData.idFilme, idUser);

      const movieAddedToUser = await this.userRepository.addMovieToUser(movieUserData, idUser);

      if (!movieAddedToUser) {
        throw new CustomHttpError('Não foi possível adicionar filme ao usuario', 500);
      }

      return { mensagem: 'Filme adicionado à sua biblioteca com sucesso!' };
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
    }
  }

  async verifyMovieUserAssociation (idMovie, idUser) {
    try {
      const movieUserAssociation = await this.userRepository.findMovieUserAssociation(idMovie, idUser);

      if (movieUserAssociation) {
        throw new CustomHttpError('Este filme já está associado à sua conta.', 400);
      }
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
    }
  }

  async findAllMoviesUser (data) {
    try {
      let page = data.currentPage;
      let itemsPage = data.itemsPerPage;
      if (!data.currentPage) {
        page = 1;
      }
      if (!data.itemsPerPage) {
        itemsPage = 10;
      }
      const totalCount = await this.userRepository.countMoviesUser(Number(data.idUsuario));
      const counterPage = (totalCount / itemsPage) < 1 ? 1 : Math.ceil((totalCount / itemsPage));

      if (data.currentPage > counterPage) {
        throw new CustomHttpError('A página requisitada está além do número total de páginas existentes.', 400);
      }

      const skipItens = page === 1 ? 0 : (page * itemsPage) - itemsPage;
      const response = {
        itens: await this.userRepository.findAllMoviesUser(Number(data.idUsuario), Number(skipItens), Number(itemsPage)),
        meta: {
          totalCount,
          counterPage
        }
      };
      return response;
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
      this.logger.dispatch('error', error.message);
    }
  }

  async deleteMovieUser (idUsuario, idFilmes) {
    try {
      const deletedMovie = await this.userRepository.deleteMovieUser(idUsuario, idFilmes);
      if (!deletedMovie.count) {
        return { mensagem: 'Filme não localizado na lista do usuário' };
      }
      return { mensagem: 'Filme deletado com sucesso' };
    } catch (error) {
      CustomHttpError.checkAndThrowError(error);
      this.logger.dispatch('error', error.message);
    }
  }
}
