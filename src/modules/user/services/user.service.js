import { UserRepository } from '../repository/user.repository'
import { CrudServiceUtils } from '../../../utils/crud/crud-service.utils'

export class UserService extends CrudServiceUtils {
  constructor () {
    super()
    this.userRepository = new UserRepository()
  }

  async findAll () {
    return this.userRepository.findAll()
  }

  async findOne () {
    return {}
  }
}
