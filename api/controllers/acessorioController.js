import acessorioModel from "../models/acessorioModel.js";

const acessorioController = {
  getAllAcessorios: async (req, res) => {
    try {
      const result = await acessorioModel.findAll();
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAcessorioById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await acessorioModel.findById(id);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Acessorio não encontrado" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAcessorioByTipo: async (req, res) => {
    const { tipo } = req.params;
    try {
      const result = await acessorioModel.findByTipo(tipo);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Acessorio não encontrado" });
      }
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createAcessorio: async (req, res) => {
    try {
      const result = await acessorioModel.create(req.body);
      res.status(201).json({ message: "Acessorio cadastrado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateAcessorio: async (req, res) => {
    const { acessorio_id, tipo, tamanho, cor, status } = req.body;
    try {
      const result = await acessorioModel.update({
        acessorio_id,
        tipo,
        tamanho,
        cor,
        status,
      });
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Acessorio atualizado com sucesso!" });
      } else {
        res.status(404).json({ message: "Acessorio não encontrado." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar o acessorio." });
    }
  },

  deleteAcessorio: async (req, res) => {
    const { id, tipo } = req.params;
    try {
      if (id) {
        const result = await acessorioModel.delete(id);
        if (result.rowCount > 0) {
          res.status(200).json({ message: "Acessorio removido com sucesso" });
        } else {
          res.status(404).json({ message: "Acessorio não encontrado." });
        }
      } else if (tipo) {
        const result = await acessorioModel.deleteByTipo(tipo);
        if (result.rowCount > 0) {
          res.status(200).json({ message: "Acessorio removido com sucesso" });
        } else {
          res.status(404).json({ message: "Acessorio não encontrado." });
        }
      } else {
        res
          .status(400)
          .json({ message: "ID ou tipo de acessorio é obrigatório." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao remover o acessorio." });
    }
  },
};

export default acessorioController;
