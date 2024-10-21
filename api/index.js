import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // Importar o pacote cors
import clienteRouter from "./routes/clienteRoutes.js";
import vestidoRouter from "./routes/vestidoRoutes.js";
import acessorioRouter from "./routes/acessorioRoutes.js";
import locacaoRouter from "./routes/locacaoRoutes.js";
import loginRouter from "./routes/loginRoutes.js";

// Carregar as variáveis do arquivo .env
dotenv.config();

// Criar a aplicação Express
const app = express();
const host = process.env.HOST_EC2 || "localhost";  // Host para escutar em todas as interfaces
const port = process.env.PORT || 3000;  // Porta onde o servidor vai rodar

// Middleware para habilitar CORS para qualquer origem
app.use(cors({
  origin: "*", // Aceitar requisições de qualquer origem
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"] // Cabeçalhos permitidos
}));

// Middleware para processar o corpo da requisição como JSON
app.use(express.json());


// Iniciar o servidor e escutar na porta especificada
app.listen(port, host, () => {
  console.log(`Servidor rodando no endereço http://${host}:${port}`);
});

// Incluir as rotas
app.use("/api", clienteRouter);
app.use("/api", vestidoRouter);
app.use("/api", acessorioRouter);
app.use("/api", locacaoRouter);
app.use('/api', loginRouter);

