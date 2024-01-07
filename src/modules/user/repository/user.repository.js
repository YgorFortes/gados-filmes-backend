import { CrudRepositoryUtils } from '../../../utils/crud/crud-repository.utils.js'

export class UserRepository extends CrudRepositoryUtils {
  findAll () {
    return this.prismaClient.user.findMany()
  }
}
