export class AppService {
  responseMainRouter () {
    return { message: 'Application are online' }
  }
}

/**
 * when there is a database dependency, make a database call in the
 * constructor to instantiate the 'repositoryDatabase' instance
 * example: userRepositoryDatabase
 */
