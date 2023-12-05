// Exporta a função que define o modelo "Categoria" para ser usado com o Sequelize
module.exports = (sequelize, Sequelize) => {
  // Requisita o objeto DataTypes do Sequelize para definir os tipos de dados
  const { DataTypes } = require('sequelize');
  
  // Define o modelo "Categoria" com colunas específicas e suas propriedades
  const Categoria = sequelize.define("categoria", {
    nome: {
      type: DataTypes.STRING, // Tipo de dado: string
      allowNull: false,       // Não permite valores nulos
    },
    //descricao: {
   //   type: DataTypes.STRING, // Tipo de dado: string
    //  allowNull: false,       // Não permite valores nulos
   // },
  });

  // Retorna o modelo "Categoria" definido
  return Categoria;
};
