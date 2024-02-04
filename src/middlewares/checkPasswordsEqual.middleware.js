export class CheckPasswordsEqual {
  static checkPasswordsEqual () {
    return async (req, res, next) => {
      const { senha, confirmaSenha } = req.body;
      if (confirmaSenha !== senha) {
        return res.status(400).send({ mensagem: 'As senhas digitadas são diferentes.' });
      }
      next();
    };
  }
}
