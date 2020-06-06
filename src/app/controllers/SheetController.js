import * as Yup from 'yup';
import cryptoRandomString from 'crypto-random-string';
import { resolve } from 'path';
import Sheet from '../models/Sheet';
import Category from '../models/Category';
import MongoImport from '../services/MongoService';
import { Op } from 'sequelize';
import mongoose from 'mongoose';
import SheetSchema from '../schemas/Sheet';

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

      const uuid = cryptoRandomString({length: 16});
      
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

  static async index(req, res) {
    try {
      const user_id = req.userId;
      const result = await Sheet.findAll({
        attributes: ['id', 'name', 'is_private', 'description', 'collection_name', 'status', 'user_id'], 
        where: {[Op.or]: [{ user_id }, { is_private: false }]},
        include: [
          {
            model: Category,
            required: true,
            attributes: ['name'],
            as: 'category'
          }
        ],
        order: [['id', 'ASC']]
      });
    
      return res.json({result});
    } catch ({ message }) {
      return res.status(501).json({ error: message });
    }
  }

  static async update(req, res) {
    try {
      const {idCollection, isPrivate} = req.body;
      const user_id = req.userId;

      const updated = await Sheet.update({is_private: !isPrivate}, {where: {id: idCollection}});

      return res.json({result: updated})
    }catch ({message}) {
      return res.status(501).json({ error: message });
    }
  }
}

export default SheetController;
