import express from "express";
import pool from "../db.js";

const router = express.Router();

//
//
// Rotas para tabela "USERS"
//
//

// GET - Obter dados do usuario para login
router.get("/users/:cpf/:data_nascimento/:senha", async (req, res) => {
  const { cpf, data_nascimento, senha } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE cpf = $1 AND data_nascimento = $2 AND senha = $3",
      [cpf, data_nascimento, senha]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar dados de login:", error);
    res.status(500).send("Erro no servidor");
  }
});

//
//
// Rotas para tabela "CLIENTES"
//
//

// GET - Obter todos os clientes
router.get("/clientes", async (req, res) => {
  const { nome } = req.query; // Obter o nome da query
  const { cpf } = req.query; // Obter o nome da query

  try {
    let query = "SELECT * FROM clientes";
    const params = [];

    if (nome) {
      query += " WHERE nome ILIKE $1";
      params.push(`%${nome}%`);
    } else if (cpf) {
      query += " WHERE cpf ILIKE $1";
      params.push(cpf);
    }

    const result = await pool.query(query, params);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).send({ message: "Nenhum cliente encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).send("Erro no servidor");
  }
});

// GET - Obter um cliente pelo ID
router.get("/clientes/:id", async (req, res) => {
  const { id } = req.params;

  // Validação básica do ID (ex: deve ser um número)
  if (isNaN(id)) {
    return res.status(400).send({ message: "ID inválido" });
  }

  try {
    const result = await pool.query("SELECT * FROM clientes WHERE cliente_id = $1", [
      id,
    ]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send({ message: "Cliente não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).send({ message: "Erro no servidor", error: error.message });
  }
});

// POST - Adicionar um novo cliente
router.post("/clientes", async (req, res) => {
  const { nome, cpf, telefone, email, endereco, bairro, cep } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO clientes (nome, cpf, telefone, email, endereco, bairro, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nome, cpf, telefone, email, endereco, bairro, cep]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
    res.status(500).send("Erro no servidor");
  }
});

//
//
// Rotas para tabela "VESTIDOS"
//
//

// GET - Obter todos os vestidos ou filtrar por modelo
router.get("/vestidos", async (req, res) => {
  const { modelo } = req.query; // Obter o modelo a partir dos query parameters

  try {
    let query = "SELECT * FROM vestidos";
    const params = [];

    // Se um modelo for fornecido, adicionar a condição WHERE
    if (modelo) {
      query += " WHERE modelo ILIKE $1";
      params.push(`%${modelo}%`);
    }

    const result = await pool.query(query, params);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).send({ message: "Nenhum vestido encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar vestidos:", error);
    res.status(500).send("Erro no servidor");
  }
});

// GET - Obter um vestido pelo ID
router.get("/vestidos/:id", async (req, res) => {
  const { id } = req.params;

  // Validação básica do ID (ex: deve ser um número)
  if (isNaN(id)) {
    return res.status(400).send({ message: "ID inválido" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM vestidos WHERE vestido_id = $1",
      [id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send({ message: "Vestido não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar vestido:", error);
    res.status(500).send({ message: "Erro no servidor", error: error.message });
  }
});


// GET - Obter um vestido pelo código
router.get("/vestidos/:codigo", async (req, res) => {
  const { codigo } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM vestidos WHERE codigo ILIKE $1",
      [codigo]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send({ message: "Vestido não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar vestido:", error);
    res.status(500).send("Erro no servidor");
  }
});

// POST - Adicionar um novo vestido
router.post("/vestidos", async (req, res) => {
  const { modelo, tamanho, cor, status, valor, codigo } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO vestidos (modelo, tamanho, cor, status, valor, codigo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [modelo, tamanho, cor, status, valor, codigo]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao adicionar vestido:", error);
    res.status(500).send("Erro no servidor");
  }
});

//
//
// Rotas para tabela "acessorios"
//
//
//

// GET - Obter todos os acessórios
router.get("/acessorios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM acessorios");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar acessórios:", error);
    res.status(500).send("Erro no servidor");
  }
});

// GET - Obter um acessório pelo ID
router.get("/acessorios/:id", async (req, res) => {
  const { id } = req.params;

  // Validação básica do ID (ex: deve ser um número)
  if (isNaN(id)) {
    return res.status(400).send({ message: "ID inválido" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM acessorios WHERE acessorio_id = $1",
      [id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send({ message: "Acessório não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar acessório:", error);
    res.status(500).send({ message: "Erro no servidor", error: error.message });
  }
});


// GET - Obter um acessório pelo tipo
router.get("/acessorios/:tipo", async (req, res) => {
  const { tipo } = req.params;

  // Verificando se o parâmetro tipo foi fornecido
  if (!tipo) {
    return res.status(400).send({ message: "Tipo não fornecido" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM acessorios WHERE tipo ILIKE $1",
      [`%${tipo}%`] // Passando o valor em um array
    );

    if (result.rows.length > 0) {
      res.json(result.rows); // Retornando todos os acessórios encontrados
    } else {
      res.status(404).send({ message: "Acessório não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar acessório:", error);
    res.status(500).send("Erro no servidor");
  }
});

// POST - Adicionar um novo acessório
router.post("/acessorios", async (req, res) => {
  const { tipo, tamanho, cor, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO acessorios (tipo, tamanho, cor, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [tipo, tamanho, cor, status]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao adicionar acessório:", error);
    res.status(500).send("Erro no servidor");
  }
});

//
//
// Rotas para tabela "locacoes"
//
//

// GET - Obter todas as locações
router.get("/locacoes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locacoes");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar locações:", error);
    res.status(500).send("Erro no servidor");
  }
});

// GET - Obter todas as locações de um cliente
router.get("/locacoes/clientes/:cliente_id", async (req, res) => {
  const { cliente_id } = req.params; // Obter o ID do cliente a partir dos parâmetros da URL
  try {
    const result = await pool.query(
      "SELECT * FROM locacoes WHERE cliente_id = $1",
      [cliente_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar locações por cliente:", error);
    res.status(500).send("Erro no servidor");
  }
});

// GET - Obter todas as locações de um vestido
router.get("/locacoes/vestidos/:vestido_id", async (req, res) => {
  const { vestido_id } = req.params; // Obter o ID do vestido a partir dos parâmetros da URL
  try {
    const result = await pool.query(
      "SELECT * FROM locacoes WHERE vestido_id = $1",
      [vestido_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar locações por vestido:", error);
    res.status(500).send("Erro no servidor");
  }
});

// POST - Registrar locação e verificar/cadastrar cliente
router.post("/locacoes/registro", async (req, res) => {
  const {
    cpf,
    nome,
    telefone,
    codigo,
    acessorio_id,
    data_retirada,
    data_devolucao,
    data_prova,
    notas,
  } = req.body;

  try {
    // Verifica se o cliente já existe
    const clientResult = await pool.query(
      "SELECT * FROM clientes WHERE cpf = $1",
      [cpf]
    );
    let cliente_id;

    if (clientResult.rows.length > 0) {
      // Se o cliente existir, pega o ID
      cliente_id = clientResult.rows[0].id;
    } else {
      // Se não existir, cadastra o novo cliente
      const newClientResult = await pool.query(
        "INSERT INTO clientes (nome, cpf, telefone, email, endereco, cep) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [nome, cpf, telefone]
      );
      cliente_id = newClientResult.rows[0].id; // Pega o ID do novo cliente
    }

    // Busca o vestido_id com base no código
    const vestidoResult = await pool.query(
      "SELECT id FROM vestidos WHERE codigo = $1",
      [codigo]
    );
    const vestido_id = vestidoResult.rows[0].id;

    // Agora, registra a locação com os IDs
    const result = await pool.query(
      "INSERT INTO locacoes (data_retirada, data_devolucao, data_prova, cliente_id, vestido_id, acessorio_id, notas) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        data_retirada,
        data_devolucao,
        data_prova,
        cliente_id,
        vestido_id,
        acessorio_id,
        notas,
      ]
    );

    res.json(result.rows[0]); // Retorna a locação registrada
  } catch (error) {
    console.error("Erro ao registrar locação:", error);
    res.status(500).send("Erro no servidor");
  }
});
export default router;
