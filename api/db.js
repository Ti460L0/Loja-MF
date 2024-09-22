import pg from "pg";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente
dotenv.config();

// Configuração do pool de conexões com as variáveis do .env
const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Testando a conexão com o banco
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conexão ao banco de dados bem-sucedida!");
  }
});

export default db;
