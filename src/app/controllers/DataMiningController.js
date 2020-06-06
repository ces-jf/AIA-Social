import {MongoExport} from '../services/MongoService';
import mongoose from 'mongoose';
import SheetSchema from '../schemas/Sheet';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'path';

class DataMiningController {
    static async store(req, res) {

        const {collection, limit, fields, filters} = req.body;
        const uuid = uuidv4();
        const newFileName = `${uuid}.csv`;

        const pathProcessed = "/home/lucas/Documentos/bases_dados/processed"

        await MongoExport("aia-social", collection, `${pathProcessed}/${newFileName}`, fields, filters, limit);

        return res.status(200).json({file: newFileName});
    }
}

export default DataMiningController;