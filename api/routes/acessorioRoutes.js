import express from "express";
import acessorioController from "../controllers/acessorioController.js";

const acessorioRouter = express.Router();

acessorioRouter.get("/ac", acessorioController.getAllAcessorios);
acessorioRouter.get("/ac/id/:id", acessorioController.getAcessorioById);
acessorioRouter.get("/ac/tipo/:tipo", acessorioController.getAcessorioByTipo);
acessorioRouter.post("/ac/ca", acessorioController.createAcessorio);
acessorioRouter.put("/ac/at/:id", acessorioController.updateAcessorio);
acessorioRouter.delete("/ac/de/:id", acessorioController.deleteAcessorio);   
acessorioRouter.delete("/ac/de/tipo/:tipo", acessorioController.deleteAcessorio);   

export default acessorioRouter;
