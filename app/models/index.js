// Requisita as configurações do banco de dados do arquivo db.config.js
const dbConfig = require("../config/db.config.js");

// Requisita o módulo Sequelize
const Sequelize = require("sequelize");

// Cria uma nova instância do Sequelize com as configurações do banco de dados
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

});

// Cria um objeto para armazenar as instâncias do Sequelize e a conexão
const db = {};

// Adiciona o Sequelize e a instância da conexão ao objeto db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Requisita os modelos de Categoria e Despesa e os vincula à instância do Sequelize
db.categoria = require("./categoria.model.js")(sequelize, Sequelize);
db.despesa = require("./despesa.model.js")(sequelize, Sequelize);

// Exporta o objeto db
module.exports = db;
