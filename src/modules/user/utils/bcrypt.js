import bcrypt from 'bcrypt'

export class UtilsBcrypt {
  static async hashPassword (password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }

  static async comparePassword (inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword)
  }
}
