import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes'; // Importa as rotas de usuário
import { errorHandler } from './middlewares/errorHandler'; // Importa o middleware de erro

const app = express();
const port = 3003; // Porta definida conforme sua solicitação

app.use(express.json());

// Middleware para permitir requisições de diferentes origens (CORS)
// 'origin: "*"' permite requisições de qualquer origem. Em produção, você pode querer restringir isso.
app.use(cors({ origin: '*' }));

// Define a base da rota para a API de usuários e associa as rotas definidas em userRoutes
app.use('/api/users', userRoutes);

// Middleware global de tratamento de erros
// Este middleware deve ser o ÚLTIMO a ser adicionado, após todas as rotas
app.use(errorHandler);

// Inicia o servidor e escuta na porta definida
app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});