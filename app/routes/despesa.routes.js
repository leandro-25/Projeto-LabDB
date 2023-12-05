// Exporta o módulo para utilização no aplicativo
module.exports = app => {

  // Requisição do controlador de despesas
  const despesa = require("../controllers/despesa.controller.js");

  // Requisição do roteador do Express
  let router = require("express").Router();

  // Cria uma nova Despesa
  router.post('/despesa', despesa.create);

  // Obtém todas as Despesas
  router.get('/despesa', despesa.findAll);

  // Obtém uma Despesa pelo ID
  router.get('/despesa/:id', despesa.findOne);

  // Atualiza uma Despesa pelo ID
  router.put('/despesa/:id', despesa.update);

  // Exclui uma Despesa pelo ID
  router.delete('/despesa/:id', despesa.delete);

  // Exclui todas as Despesas
  router.delete('/despesa', despesa.deleteAll);

  // Utiliza o roteamento para as rotas relacionadas a Despesa
  app.use('/api/despesa', router);
};
