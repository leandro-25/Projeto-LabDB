// Importa o modelo de dados e atribui à constante 'db'
const db = require("../models");

// Obtém o modelo de dados específico para Despesa
const Despesa = db.despesa;

// Controlador para obter estatísticas mensais
exports.obterEstatisticasMensais = async (req, res) => {
  try {
    // Chama a função para calcular estatísticas mensais
    const estatisticasMensais = await calcularEstatisticasMensais();
    
    // Retorna as estatísticas mensais como resposta
    return res.status(200).json(estatisticasMensais);
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro
    console.error('Erro ao obter estatísticas mensais:', error);
    return res.status(500).json({ error: 'Erro ao obter estatísticas mensais.' });
  }
};

// Controlador para obter estatísticas anuais
exports.obterEstatisticasAnuais = async (req, res) => {
  try {
    // Chama a função para calcular estatísticas anuais
    const estatisticasAnuais = await calcularEstatisticasAnuais();
    
    // Retorna as estatísticas anuais como resposta
    return res.status(200).json(estatisticasAnuais);
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro
    console.error('Erro ao obter estatísticas anuais:', error);
    return res.status(500).json({ error: 'Erro ao obter estatísticas anuais.' });
  }
};

// Controlador para obter estatísticas totais
exports.obterEstatisticasTotais = async (req, res) => {
  try {
    // Chama a função para calcular estatísticas totais
    const estatisticasTotais = await calcularEstatisticasTotais();
    
    // Retorna as estatísticas totais como resposta
    return res.status(200).json(estatisticasTotais);
  } catch (error) {
    // Em caso de erro, loga o erro e retorna uma resposta de erro
    console.error('Erro ao obter estatísticas totais:', error);
    return res.status(500).json({ error: 'Erro ao obter estatísticas totais.' });
  }
};

// Função para calcular estatísticas mensais
const calcularEstatisticasMensais = async () => {
  try {
    // Consulta o banco de dados para obter estatísticas mensais
    const estatisticasMensais = await Despesa.findAll({
      attributes: [
        // Calcula o mês a partir da coluna 'data'
        [db.Sequelize.fn('MONTH', db.Sequelize.col('data')), 'mes'],
        // Conta a quantidade de registros
        [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'quantidade'],
        // Soma os valores negativos
        [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN valor < 0 THEN valor ELSE 0 END')), 'totalNegativo'],
        // Soma os valores positivos
        [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN valor > 0 THEN valor ELSE 0 END')), 'totalPositivo'],
      ],
      // Agrupa os resultados pelo mês
      group: [db.Sequelize.fn('MONTH', db.Sequelize.col('data'))],
    });

    // Retorna as estatísticas mensais
    return estatisticasMensais;
  } catch (error) {
    // Em caso de erro, loga o erro e retorna um objeto de erro
    console.error('Erro ao obter estatísticas Mensais:', error);
    return { error: 'Erro ao obter estatísticas Mensais.' };
  }
};

// Função para calcular estatísticas anuais
const calcularEstatisticasAnuais = async () => {
  try {
    // Consulta o banco de dados para obter estatísticas anuais
    const estatisticasAnuais = await Despesa.findAll({
      attributes: [
        // Calcula o ano a partir da coluna 'data'
        [db.Sequelize.fn('YEAR', db.Sequelize.col('data')), 'ano'],
        // Conta a quantidade de registros
        [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'quantidade'],
        // Soma os valores negativos
        [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN valor < 0 THEN valor ELSE 0 END')), 'totalNegativo'],
        // Soma os valores positivos
        [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN valor > 0 THEN valor ELSE 0 END')), 'totalPositivo'],
      ],
      // Agrupa os resultados pelo ano
      group: [db.Sequelize.fn('YEAR', db.Sequelize.col('data'))],
    });

    // Retorna as estatísticas anuais
    return estatisticasAnuais;
  } catch (error) {
    // Em caso de erro, loga o erro e retorna um objeto de erro
    console.error('Erro ao obter estatísticas Anuais:', error);
    return { error: 'Erro ao obter estatísticas Anuais.' };
  }
};

// Função para calcular estatísticas totais
const calcularEstatisticasTotais = async () => {
  try {
    // Consulta o banco de dados para obter estatísticas totais
    const estatisticasTotais = await Despesa.findAll({
      attributes: [
        // Conta a quantidade total de registros
        [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'quantidade'],
        // Soma os valores negativos
        [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN valor < 0 THEN valor ELSE 0 END')), 'totalNegativo'],
        // Soma os valores positivos
        [db.Sequelize.fn('SUM', db.Sequelize.literal('CASE WHEN valor > 0 THEN valor ELSE 0 END')), 'totalPositivo'],
      ],
    });

    // Retorna as estatísticas totais
    return estatisticasTotais;
  } catch (error) {
    // Em caso de erro, loga o erro e retorna um objeto de erro
    console.error('Erro ao obter estatísticas totais:', error);
    return { error: 'Erro ao obter estatísticas totais.' };
  }
};
