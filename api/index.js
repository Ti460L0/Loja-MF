import dotenv from "dotenv";
import express from "express";
import pg from "pg";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração do Pool do PostgreSQL usando variáveis de ambiente
const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint de exemplo para obter dados
app.get("/api", async (req, res) => {
 console.log(req.body);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
