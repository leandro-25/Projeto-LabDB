module.exports = (app) => {
    const estatisticas = require("../controllers/estatisticas.controller.js");
  
    let router = require("express").Router();
  
    // Obter estatísticas mensais
    router.get("/estatisticas/mensais", estatisticas.obterEstatisticasMensais);
  
    // Obter estatísticas anuais
    router.get("/estatisticas/anuais", estatisticas.obterEstatisticasAnuais);
  
    // Obter estatísticas totais
    router.get("/estatisticas/totais", estatisticas.obterEstatisticasTotais);
  
    app.use("/api/estatisticas", router);
  };
  