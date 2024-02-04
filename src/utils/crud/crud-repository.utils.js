import { PrismaClient } from '@prisma/client';
import { CrudServiceUtils } from './crud-service.utils.js';

export class CrudRepositoryUtils extends CrudServiceUtils {
  constructor () {
    super();
    this.prismaClient = new PrismaClient();
  }
}
