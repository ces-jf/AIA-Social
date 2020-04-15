import * as Yup from 'yup';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import * as csv from 'fast-csv';
import { resolve } from 'path';
import SheetSchema from '../schemas/Sheet';
import Sheet from '../models/Sheet';

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

      const mongoModel = mongoose.model(uuid, SheetSchema);

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

      await fs
        .createReadStream(
          resolve(
            __dirname,
            '..',
            '..',
            '..',
            'temp',
            'uploads',
            sheetCreated.path
          )
        )
        .pipe(csv.parse({ headers: true, delimiter: ';' }))
        .transform(async (row, next) => {
          await mongoModel.create(row);
          next();
        })
        .on('error', async () => {
          await Sheet.update(
            { status: 'Erro' },
            { where: { id: sheetCreated.id } }
          );
        })
        .on('end', async () => {
          await Sheet.update(
            { status: 'Sucesso' },
            { where: { id: sheetCreated.id } }
          );
        });

      return res.json(sheetCreated);
    } catch ({ message }) {
      return res.status(501).json({ error: message });
    }
  }
}

export default SheetController;
