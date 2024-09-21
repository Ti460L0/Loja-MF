import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Middleware para processar o JSON no corpo das requisi es
app.use(express.json());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Endpoint para buscar todos os clientes
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM clientes");
    res.json(result.rows); // Enviar resposta como JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

// Endpoint para adicionar um novo cliente
app.post("/clientes", async (req, res) => {
  const { nome, cpf, email } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO clientes (nome, cpf, email) VALUES ($1, $2, $3)",
      [nome, cpf, email]
    );
    res.status(201).json(result.rows[0]); // Enviar resposta com o cliente criado
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar cliente" });
  }
});

// Conectar ao banco de dados
db.connect();

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
