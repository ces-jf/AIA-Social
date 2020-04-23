import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';
import Sheet from '../models/Sheet';
import MongoImport from '../services/MongoImport';

class SheetController {
  static async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required().max(100),
        path: Yup.string().required().max(100),
        is_private: Yup.boolean().required(),
        description: Yup.string().required(),
        category_id: Yup.number().required(),
      });
      let listErrors;
      await schema
        .validate(req.body, { abortEarly: false })
        .catch(({ errors }) => {
          listErrors = errors;
        });
      if (listErrors) return res.status(401).json({ errors: listErrors });

      const uuid = uuidv4();
      const newFileName = `${uuid}.csv`;

      const { name, path, is_private, description, category_id } = req.body;

      const user_id = req.userId;

      const sheetCreated = await Sheet.create({
        name,
        path,
        is_private,
        description,
        category_id,
        user_id,
        collection_name: uuid,
      });

      const pathFiles = resolve(__dirname, '..', '..', '..', 'temp', 'uploads');

      MongoImport(
        'aia-social',
        uuid,
        resolve(pathFiles, path),
        resolve(pathFiles, newFileName),
        sheetCreated.id
      );

      return res.json(sheetCreated);
    } catch ({ message }) {
      return res.status(501).json({ error: message });
    }
  }
}

export default SheetController;
