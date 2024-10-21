import clienteModel from "../models/clienteModel.js";
import vestidoModel from "../models/vestidoModel.js";

const vestidoController = {
  getAllVestidos: async (req, res) => {
    try {
      const result = await vestidoModel.findAll();
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao buscar vestidos:", error);
      res.status(500).json({ error: "Erro ao buscar vestidos" });
    }
  },
  getVestidoById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await vestidoModel.findById(id);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Vestido não encontrado" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar vestido:", error);
      res.status(500).json({ error: "Erro ao buscar vestido" });
    }
  },
  getVestidoByCodigo: async (req, res) => {
    const { codigo } = req.params;
    try {
      const result = await vestidoModel.findByCodigo(codigo);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Vestido não encontrado" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar vestido:", error);
      res.status(500).json({ error: "Erro ao buscar vestido" });
    }
  },
  getVestidoByModelo: async (req, res) => {
    const { modelo } = req.params;
    try {
      const result = await vestidoModel.findByModelo(modelo);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Vestido não encontrado" });
      }
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao buscar vestido:", error);
      res.status(500).json({ error: "Erro ao buscar vestido" });
    }
  },
  createVestido: async (req, res) => {
    try {
      const result = await vestidoModel.create(req.body);
      res.status(201).json({ message: "Vestido cadastrado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateVestido: async (req, res) => {
    const { vestido_id, modelo, tamanho, cor, status, valor, url } = req.body;
    try {
      const result = await vestidoModel.update({
        vestido_id,
        modelo,
        tamanho,
        cor,
        status,
        valor,
        url,
      });
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Vestido atualizado com sucesso!" });
      } else {
        res.status(404).json({ message: "Vestido não encontrado." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar o vestido." });
    }
  },
  deleteVestido: async (req, res) => {
    const { id, codigo } = req.params;
    try {
      if (id) {
        const result = await vestidoModel.delete(id);
        if (result.rowCount > 0) {
          res.status(200).json({ message: "Vestido removido com sucesso" });
        } else {
          res.status(404).json({ message: "Vestido não encontrado." });
        }
      } else if (codigo) {
        const result = await vestidoModel.deleteByCodigo(codigo);
        if (result.rowCount > 0) {
          res.status(200).json({ message: "Vestido removido com sucesso" });
        } else {
          res.status(404).json({ message: "Vestido não encontrado." });
        }
      } else {
        res.status(400).json({ message: "ID ou código de vestido é obrigatório." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao remover o vestido." });
    }
  },
};

export default vestidoController;
