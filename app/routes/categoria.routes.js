// Exporta o módulo para utilização no aplicativo
module.exports = app => {
    
    // Requisição do controlador de categorias
    const categorias = require("../controllers/categoria.controller.js");
    
    // Requisição do roteador do Express
    let router = require("express").Router();

    // Cria uma nova Categoria
    router.post("/categoria", categorias.create);

    // Obtém todas as Categorias
    router.get("/categoria", categorias.findAll);

    // Obtém uma única Categoria pelo ID
    router.get("/categoria/:id", categorias.findOne);

    // Atualiza uma Categoria pelo ID
    router.put("/categoria/:id", categorias.update);

    // Exclui uma Categoria pelo ID
    router.delete("/categoria/:id", categorias.deleteOne);

    // Exclui todas as Categorias
    router.delete("/categoria", categorias.deleteAll);

    // Utiliza o roteamento para as rotas relacionadas a Categoria
    app.use('/api/categoria', router);
};
