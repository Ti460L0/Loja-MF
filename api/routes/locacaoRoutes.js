import express from 'express';
import locacaoController from '../controllers/locacaoController.js';

const locacaoRouter = express.Router();

locacaoRouter.get('/lo', locacaoController.getAllLocacoes);
locacaoRouter.get('/lo/cl/:cliente_id', locacaoController.getLocacaoByClienteId); 
locacaoRouter.get('/lo/ve/:vestido_id', locacaoController.getLocacaoByVestidoId);
locacaoRouter.post('/lo/ca', locacaoController.createLocacao);
locacaoRouter.put('/lo/at/:id', locacaoController.updateLocacao);
locacaoRouter.delete('/lo/de/:id', locacaoController.deleteLocacao);
export default locacaoRouter;

