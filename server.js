// Importa o módulo 'express' para criar uma aplicação Express
const express = require("express");

// Cria uma instância do aplicativo Express
const app = express();

// Habilita o middleware para analisar solicitações JSON
app.use(express.json());

// Habilita o middleware para analisar solicitações com dados de formulário
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados e sincronização
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Banco de dados sincronizado");
  })
  .catch((err) => {
    console.log("Falha na sincronização do banco de dados: " + err.message);
  });

// Sincroniza o banco de dados com a opção force (apaga e recria as tabelas)
// comentar trecho abaixo para redefinir o banco de dados 
db.sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados redefinido");
});
//ate aqui

// Rota principal
app.get("/", (req, res) => {
  res.json({ message: "controle de despesas." });
});

// Inclui as rotas relacionadas a despesas e categorias
require("./app/routes/despesa.routes")(app);
require("./app/routes/categoria.routes")(app);
require("./app/routes/estatisticas.routes")(app);

// Configura o aplicativo para ouvir as solicitações na porta especificada
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`O servidor está em execução na porta ${PORT}.`);
});
