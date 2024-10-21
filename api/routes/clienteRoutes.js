import express from 'express';
import clienteController from '../controllers/clienteController.js';

const clienteRouter = express.Router();

clienteRouter.get('/cl', clienteController.getAllClientes);
clienteRouter.get('/cl/cpf/:cpf', clienteController.getClienteByCpf);
clienteRouter.get('/cl/id/:id', clienteController.getClienteById);
clienteRouter.get('/cl/nome/:nome', clienteController.getClienteByNome);
clienteRouter.post('/cl/ca', clienteController.createCliente);
clienteRouter.put('/cl/at/:id', clienteController.updateCliente);
clienteRouter.delete('/cl/de/:id', clienteController.deleteCliente);

export default clienteRouter;
