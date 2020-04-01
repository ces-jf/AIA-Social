import User from '../schemas/User';

class UserController {
  static async store(req, res) {
    try {
      const { user_name, password, email } = req.body;

      const userByEmail = await User.findOne({ email });

      if (userByEmail)
        return res
          .status(401)
          .json({ message: 'E-mail já está sendo utilizado' });

      const userByUserName = await User.findOne({ user_name });

      if (userByUserName)
        return res
          .status(401)
          .json({ message: 'User name já está sendo utilizado' });

      const { _id } = await User.create({ user_name, password, email });

      return res.json({ result: _id });
    } catch (error) {
      return res
        .status(501)
        .json({ message: 'Houve um erro ao procesar sua solicitação.', error });
    }
  }
}

export default UserController;
