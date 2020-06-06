import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

import UserControler from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';
import SessionController from './app/controllers/SessionController';
import SheetController from './app/controllers/SheetController';
import FileController from './app/controllers/FileController';
import DataMiningController from './app/controllers/DataMiningController';

const routes = new Router();
const upload = multer(multerConfig);

// Usuário não precisa estar logado
routes.post('/users', UserControler.store);
routes.post('/sessions', SessionController.store);

// Usuário precisa estar logado
routes.use(authMiddleware);
routes.put('/users', UserControler.update);
routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.get('/sheets', SheetController.index);
routes.post('/sheets', SheetController.store);
routes.put('/sheets', SheetController.update);
routes.post('/uploads', upload.single('file'), FileController.store);
routes.post('/sheets/generate', DataMiningController.store);

export default routes;
