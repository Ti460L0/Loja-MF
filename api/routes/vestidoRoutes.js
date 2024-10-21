import express from "express";
import vestidoController from "../controllers/vestidoController.js";

const vestidoRouter = express.Router();

vestidoRouter.get("/ve", vestidoController.getAllVestidos);
vestidoRouter.get("/ve/id/:id", vestidoController.getVestidoById);
vestidoRouter.get("/ve/co/:codigo", vestidoController.getVestidoByCodigo);
vestidoRouter.get("/ve/mo/:modelo", vestidoController.getVestidoByModelo);
vestidoRouter.post("/ve/ca", vestidoController.createVestido);
vestidoRouter.put("/ve/at/:id", vestidoController.updateVestido);
vestidoRouter.delete("/ve/de/:id", vestidoController.deleteVestido);   
vestidoRouter.delete("/ve/de/co/:codigo", vestidoController.deleteVestido);   

export default vestidoRouter;