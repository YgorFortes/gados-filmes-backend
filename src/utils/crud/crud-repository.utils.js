import { PrismaClient } from '@prisma/client/edge'
import { CrudServiceUtils } from './crud-service.utils'

export class CrudRepositoryUtils extends CrudServiceUtils {
  constructor () {
    super()
    this.prismaClient = new PrismaClient()
  }
}
