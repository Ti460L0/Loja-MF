const { Client } = require('pg');
require('dotenv').config();  // Para carregar as variáveis de ambiente do arquivo .env

// Criar a conexão com o PostgreSQL usando as variáveis do arquivo .env
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Estabelecer conexão com o banco de dados
client.connect()
  .then(() => console.log("Conectado ao banco de dados PostgreSQL"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados", err));

// Exportar o cliente para ser utilizado em outros módulos
module.exports = client;
