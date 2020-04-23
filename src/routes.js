import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

import UserControler from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';
import SessionController from './app/controllers/SessionController';
import SheetController from './app/controllers/SheetController';
import FileController from './app/controllers/FileController';

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
routes.post('/sheets', SheetController.store);
routes.post('/uploads', upload.single('file'), FileController.store);

export default routes;
