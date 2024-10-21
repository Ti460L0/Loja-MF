import locacaoModel from "../models/locacaoModel.js";

const locacaoController = {
  getAllLocacoes: async (req, res) => {
    try {
      const result = await locacaoModel.findAll();
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao buscar locações:", error);
      res.status(500).json({ error: "Erro ao buscar locações" });
    }
  },
  getLocacaoById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await locacaoModel.findById(id);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Locação não encontrada" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar locação:", error);
      res.status(500).json({ error: "Erro ao buscar locação" });
    }
  },
  getLocacaoByClienteId: async (req, res) => {
    const { cliente_id } = req.params;
    try {
      const result = await locacaoModel.findByClienteId(cliente_id);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Locação não encontrada" });
      }
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao buscar locação por cliente:", error);
      res.status(500).json({ error: "Erro ao buscar locação por cliente" });
    }
  },
  getLocacaoByVestidoId: async (req, res) => {
    const { vestido_id } = req.params;
    try {
      const result = await locacaoModel.findByVestidoId(vestido_id);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Locação não encontrada" });
      }
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao buscar locação por vestido:", error);
      res.status(500).json({ error: "Erro ao buscar locação por vestido" });
    }
  },
  createLocacao: async (req, res) => {
    try {
      const result = await locacaoModel.create(req.body);
      res.status(201).json({ message: "Locação cadastrada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateLocacao: async (req, res) => {
    const { locacao_id, cliente_id, vestido_id, acessorio_id, data_retirada, data_devolucao, data_prova, notas } = req.body;
    try {
      const result = await locacaoModel.update({
        locacao_id,
        cliente_id,
        vestido_id,
        acessorio_id,
        data_retirada,
        data_devolucao,
        data_prova,
        notas,
      });
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Locação atualizada com sucesso!" });
      } else {
        res.status(404).json({ message: "Locação não encontrada." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar a locação." });
    }
  },
  deleteLocacao: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await locacaoModel.delete(id);
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Locação removida com sucesso" });
      } else {
        res.status(404).json({ message: "Locação não encontrada." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao remover a locação." });
    }
  },
};

export default locacaoController;

