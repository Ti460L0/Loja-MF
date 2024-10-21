import express from 'express';
import loginController from '../controllers/loginController.js';

const loginRouter = express.Router();

loginRouter.post('/login', loginController.login);
loginRouter.post('/register', loginController.register); // Nova rota para registro
loginRouter.post('/alterarSenha', loginController.alterarSenha);

export default loginRouter;
