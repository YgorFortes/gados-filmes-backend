import bcrypt from 'bcrypt';

export class UtilsBcrypt {
  static async hashPassword (password) {
    return bcrypt.hash(password, Number(process.env.SALT_ROUNDS) ?? 10);
  }

  static async comparePassword (inputPassword, hashedPassword) {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
