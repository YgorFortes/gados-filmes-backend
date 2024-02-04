export class CustomHttpError extends Error {
  constructor (message = 'Problemas no servidor! Volte mais tarde', statusCode = 500) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  static checkAndThrowError (error) {
    if (error instanceof CustomHttpError) {
      throw error;
    }

    throw new Error();
  }
}
