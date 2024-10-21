import clienteModel from "../models/clienteModel.js";

const clienteController = {
  getAllClientes: async (req, res) => {
    try {
      const result = await clienteModel.findAll();
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClienteByNome: async (req, res) => {
    const { nome } = req.params; // Extrair o nome da URL
    try {
      const result = await clienteModel.findByNome(nome); // Consultar o banco de dados
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      res.json(result.rows); // Retornar todos os clientes com o nome
    } catch (error) {
      console.error(error); // Logar o erro para depuração
      res.status(500).json({ error: error.message });
    }
  },

  getClienteByCpf: async (req, res) => {
    const { cpf } = req.params; // Extraindo o CPF da URL
    console.log("CPF recebido:", cpf); // Verificar se o CPF está sendo extraído
    try {
      const result = await clienteModel.findByCpf(cpf); // Consultando o banco de dados
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      res.json(result.rows[0]); // Retornando o cliente encontrado
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClienteById: async (req, res) => {
    const { id } = req.params; // Extraindo o id da URL
    console.log("Id recebido:", id); // Verificar se o id está sendo extraído
    try {
      const result = await clienteModel.findById(id); // Consultando o banco de dados
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      res.json(result.rows[0]); // Retornando o cliente encontrado
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCliente: async (req, res) => {
    try {
      const result = await clienteModel.create(req.body);
      res.status(201).json({ message: "Cliente cadastrado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCliente: async (req, res) => {
    const { cliente_id, cpf, nome, email, telefone, endereco, bairro, cep } =
      req.body;

    try {
      const result = await clienteModel.update({
        cliente_id,
        cpf,
        nome,
        email,
        telefone,
        endereco,
        bairro,
        cep,
      });
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Cliente atualizado com sucesso!" });
      } else {
        res.status(404).json({ message: "Cliente não encontrado." });
      }
    } catch (error) {
      console.error(error); // Para debugar o erro
      res.status(500).json({ error: "Erro ao atualizar o cliente." });
    }
  },

  deleteCliente: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await clienteModel.delete(id);
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Cliente removido com sucesso" });
      } else {
        res.status(404).json({ message: "Cliente não encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default clienteController;
