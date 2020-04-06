import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  static async store(req, res) {
    const schema = Yup.object().shape({
      userNameOrEmail: Yup.string().required().max(255),
      password: Yup.string().required().min(6).max(100),
    });

    let listErrors;
    await schema
      .validate(req.body, { abortEarly: false })
      .catch(({ errors }) => {
        listErrors = errors;
      });

    if (listErrors) return res.status(401).json({ errors: listErrors });

    const { userNameOrEmail, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: userNameOrEmail }, { user_name: userNameOrEmail }],
      },
    });

    if (!user || !(await user.checkPassword(password)))
      return res.status(401).json({ error: 'Incorrect user data' });

    const { id, name, email } = user;

    return res.json({
      user: { name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default SessionController;
