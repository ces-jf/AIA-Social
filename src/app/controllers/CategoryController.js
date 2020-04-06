import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
  static async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required().max(100),
      });

      let listErrors;
      await schema
        .validate(req.body, { abortEarly: false })
        .catch(({ errors }) => {
          listErrors = errors;
        });

      if (listErrors) return res.status(401).json({ errors: listErrors });

      const { name } = req.body;

      const categoryCreated = await Category.create({ name });

      return res.json({ categoryId: categoryCreated.id });
    } catch ({ message }) {
      return res.status(501).json({ error: message });
    }
  }

  static async index(req, res) {
    try {
      const categories = await Category.findAll({ attributes: ['id', 'name'] });

      return res.json({ categories });
    } catch ({ message }) {
      return res.status(501).json({ error: message });
    }
  }
}

export default CategoryController;
