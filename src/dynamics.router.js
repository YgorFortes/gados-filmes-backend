import { json, Router } from 'express';
import { CheckPasswordsEqual } from './middlewares/check-passwords-equal.middleware.js';
import { CheckUserExist } from './middlewares/check-user-exists.middleware.js';
import { ErrorMiddlewares } from './middlewares/error.middlewares.js';
import { AppController } from './modules/app/app.controller.js';
import { AuthController } from './modules/auth/auth.controller.js';
import { HomeController } from './modules/movie/home.controller.js';
import { MovieController } from './modules/movie/movie.controller.js';
import { UserController } from './modules/user/user.controller.js';

export class DynamicsRoutes {
  constructor () {
    this.router = Router();
    this.json = json();
  }

  /**
   * integrate routes in the service based on controllers
   */
  setupRoutes () {
    this.router.use(this.json);
    const appController = new AppController();
    const userController = new UserController();
    const authController = new AuthController();
    const homeController = new HomeController();

    this.router.use('/', appController.routes());
    this.router.use('/', authController.routes());
    this.router.use('/user', userController.routes());
    this.router.use('/', homeController.routes());
    const checkUserExist = new CheckUserExist();
    const errorMiddlewares = new ErrorMiddlewares();
    const movieController = new MovieController();

    this.router.use('/', appController.routes());
    this.router.use('/', checkUserExist.findUser(), CheckPasswordsEqual.checkPasswordsEqual(), userController.routes());
    this.router.use('/', movieController.routes());
    this.router.use('/', authController.routes());

    this.router.use(errorMiddlewares.handleRequestErrors());
    this.router.use(errorMiddlewares.handleErro404());
  }

  /**
   * integrate all routes in the instance service
   * @param app
   */
  attachToApp (app) {
    app.use('/api/v1', this.router);
  }
}
