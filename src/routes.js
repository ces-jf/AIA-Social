import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import UserControler from './app/controllers/UserController';
import CategoryController from './app/controllers/CategoryController';
import SessionControler from './app/controllers/SessionController';

const routes = new Router();

// Usuário não precisa estar logado
routes.post('/users', UserControler.store);
routes.post('/sessions', SessionControler.store);

// Usuário precisa estar logado
routes.use(authMiddleware);
routes.put('/users', UserControler.update);
routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);

export default routes;
