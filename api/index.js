import express from "express";
import db from "./db.js";  // Importa a configuração do banco de dados a partir de db.js
import dotenv from "dotenv";

// Carregar as variáveis do arquivo .env
dotenv.config();

// Criar a aplicação Express
const app = express();
const host = process.env.HOST_EC2;  // Host para escutar em todas as interfaces
const port = 3000;  // Porta onde o servidor vai rodar

// Middleware para processar o corpo da requisição como JSON
app.use(express.json());

// Rota para buscar todos os clientes
app.get("/", async (req, res) => {
  try {
    // Query para buscar todos os clientes da tabela 'clientes'
    const result = await db.query("SELECT * FROM clientes");
    res.json(result.rows);  // Retorna os resultados como JSON
  } catch (err) {
    console.error("Erro ao buscar clientes:", err.message);
    res.status(500).json({ error: "Erro ao buscar clientes", details: err.message });
  }
});

// Rota para adicionar um novo cliente
app.post("/clientes", async (req, res) => {
  const { nome, cpf, email, telefone, endereco, bairro, cep } = req.body;
  try {
    // Query para inserir um novo cliente na tabela 'clientes'
    const result = await db.query(
      "INSERT INTO clientes (nome, cpf, email, telefone, endereco, bairro, cep) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [nome, cpf, email, telefone, endereco, bairro, cep]
    );
    res.status(201).json(result.rows[0]);  // Retorna o cliente criado como resposta
  } catch (err) {
    console.error("Erro ao adicionar cliente:", err.message);
    res.status(500).json({ error: "Erro ao adicionar cliente", details: err.message });
  }
});

// Iniciar o servidor e escutar na porta especificada
app.listen(port, host, () => {
  console.log(`Servidor rodando no endereço http://${host}:${port}`);
});
