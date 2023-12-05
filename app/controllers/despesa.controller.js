// Requisita o objeto do modelo "Despesa" do módulo models
const db = require("../models");

// Obtém a instância do modelo "Despesa"
const Despesa = db.despesa;

// Obtém a referência ao operador Sequelize "Op"
const Op = db.Sequelize.Op;

// Cria e salva uma nova Despesa no banco de dados
exports.create = (req, res) => {
  // Valida a requisição
  Despesa.create({
    valor: req.body.valor,
    data: req.body.data,
    descricao: req.body.descricao,
    categoriaId: req.body.categoriaId, //  ID da categoria
  })
    .then(despesa => {
      return res.status(201).json(despesa);
    })
    .catch(error => {
      return res.status(500).json({ error: 'Erro ao criar despesa.' });
    });
};

// Recupera todas as Despesas do banco de dados
exports.findAll = (req, res) => {
  Despesa.findAll()
    .then(despesas => {
      return res.status(200).json(despesas);
    })
    .catch(error => {
      return res.status(500).json({ error: 'Erro ao buscar despesas.' });
    });
};

// Encontra uma única Despesa pelo ID
exports.findOne = (req, res) => {
  Despesa.findByPk(req.params.id)
    .then(despesa => {
      if (!despesa) {
        return res.status(404).json({ error: 'Despesa não encontrada.' });
      }
      return res.status(200).json(despesa);
    })
    .catch(error => {
      return res.status(500).json({ error: 'Erro ao buscar despesa.' });
    });
};
// Atualiza uma Despesa pelo ID
exports.update = (req, res) => {
  Despesa.findByPk(req.params.id)
    .then(despesa => {
      if (!despesa) {
        return res.status(404).json({ error: 'Despesa não encontrada.' });
      }
      return despesa.update(req.body);
    })
    .then(updatedDespesa => {
      return res.status(200).json(updatedDespesa);
    })
    .catch(error => {
      return res.status(500).json({ error: 'Erro ao atualizar despesa.' });
    });
};

/// Exclui uma Despesa pelo ID
exports.delete = (req, res) => {
  Despesa.findByPk(req.params.id)
    .then(despesa => {
      if (!despesa) {
        return res.status(404).json({ error: 'Despesa não encontrada.' });
      }
      return despesa.destroy();
    })
    .then(() => {
      return res.status(204).json({ message: 'Despesa excluída com sucesso.' });
    })
    .catch(error => {
      return res.status(500).json({ error: 'Erro ao excluir despesa.' });
    });
};

// Exclui todas as Despesas do banco de dados
exports.deleteAll = (req, res) => {
  Despesa.destroy({ where: {} })
    .then(() => {
      console.log('Despesas excluídas com sucesso.'); // Adicione este console.log
      return res.status(200).json({ message: 'Todas as despesas foram excluídas com sucesso.' });
    })
    .catch(error => {
      return res.status(500).json({ error: 'Erro ao excluir despesas.' });
    });
};



