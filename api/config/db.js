import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pkg;

const db_connect = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db_connect.connect()
  .then(() => console.log('Conectado ao banco de dados na EC2!'))
  .catch(err => console.error('Erro ao conectar no banco de dados:', err));

export default db_connect;
