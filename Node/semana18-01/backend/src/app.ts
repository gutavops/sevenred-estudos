import express from 'express';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes'; 
import { errorHandler } from './middlewares/errorHandler'; 

const app = express();

app.use(express.json());

// Middleware para permitir requisições de diferentes origens (CORS)
// 'origin: "*"' permite requisições de qualquer origem. 
app.use(cors({ origin: '*' }));

// Define a base da rota para a API de usuários e associa as rotas definidas em userRoutes
app.use('/api/transaction', transactionRoutes);

// Middleware global de tratamento de erros
// Este middleware deve ser o ÚLTIMO a ser adicionado, após todas as rotas
app.use(errorHandler);

export default app;