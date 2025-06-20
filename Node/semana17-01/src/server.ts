import app from './app'

const port = 3100;

// Inicia o servidor e escuta na porta definida
app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});

