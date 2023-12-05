// Exporta a função que define o modelo "Despesa" para ser usado com o Sequelize
module.exports = (sequelize, Sequelize) => {
  // Requisita o objeto DataTypes do Sequelize para definir os tipos de dados
  const { DataTypes } = require('sequelize');

  // Define o modelo "Despesa" com colunas específicas e suas propriedades
  const Despesa = sequelize.define("despesa", {
    valor: {
      type: DataTypes.FLOAT, // Tipo de dado: número de ponto flutuante
      allowNull: false,     // Não permite valores nulos
    },
    data: {
      type: DataTypes.DATE,  // Tipo de dado: data
      allowNull: false,      // Não permite valores nulos
    },
    descricao: {
      type: DataTypes.STRING, // Tipo de dado: string
      allowNull: false,      // Não permite valores nulos
    },
  });

  // Adiciona a associação à tabela de Categoria usando belongsTo
  Despesa.belongsTo(sequelize.models.categoria, {
    foreignKey: {
      name: 'categoriaId', // Nome da coluna na tabela de Despesa
      allowNull: false,     // Não permite valores nulos para a chave estrangeira
    },
    as: 'categoria',        // Alias para a associação
  });

  // Retorna o modelo "Despesa" definido
  return Despesa;
};
