import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
  static async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required().max(255),
        email: Yup.string().email().required().max(255),
        user_name: Yup.string().required().max(100),
        password: Yup.string().required().min(6).max(100),
      });

      let listErrors;
      await schema
        .validate(req.body, { abortEarly: false })
        .catch(({ errors }) => {
          listErrors = errors;
        });

      if (listErrors) return res.status(401).json({ errors: listErrors });

      const { name, email, user_name, password } = req.body;

      const user = await User.findOne({
        where: { [Op.or]: [{ email }, { user_name }] },
      });
      if (user) res.status(401).json({ error: 'User already existis.' });

      const userCreated = await User.create({
        name,
        email,
        user_name,
        password,
      });

      return res.json({ userId: userCreated.id });
    } catch ({ message }) {
      return res.status(501).json({ error: message });
    }
  }

  static async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().max(255),
        email: Yup.string().email().max(255),
        password: Yup.string().min(6).max(100),
      });

      let listErrors;
      await schema
        .validate(req.body, { abortEarly: false })
        .catch(({ errors }) => {
          listErrors = errors;
        });

      if (listErrors) return res.status(401).json({ errors: listErrors });

      const { name, email, password } = req.body;

      const user = await User.findByPk(req.userId);

      if (!user) return res.status(401).json({ error: 'User does not exist.' });

      if (email && email !== user.email) {
        const userExistis = await User.findOne({ where: { email } });
        if (userExistis) {
          return res
            .status(400)
            .json({ error: 'User already registered with this email.' });
        }
      }

      const userUpdated = await user.update({ name, email, password });

      return res.json({ name: userUpdated.name, email: userUpdated.email });
    } catch ({ message }) {
      return res.status(501).json({ error: message });
    }
  }
}

export default UserController;
