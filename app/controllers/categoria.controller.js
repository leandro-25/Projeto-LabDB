// Requisita o objeto do modelo "Categoria" do módulo models
const db = require("../models");

// Obtém a instância do modelo "Categoria"
const Categoria = db.categoria;

// Obtém a referência ao operador Sequelize "Op"
const Op = db.Sequelize.Op;

// Cria uma nova categoria no banco de dados
exports.create = async (req, res) => {
    try {
        // Verifica se já existe uma categoria com o mesmo nome
        const existingCategoria = await Categoria.findOne({ where: { nome: req.body.nome } });

        if (existingCategoria) {
            // Se a categoria já existir, retorne um erro
            return res.status(400).json({ error: 'Já existe uma categoria com este nome.' });
        }

        // Se não existir, cria a nova categoria
        const novaCategoria = await Categoria.create(req.body);

        return res.status(201).json({ message: 'Categoria criada com sucesso.', categoria: novaCategoria });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar categoria.' });
    }
};

// Recupera todas as categorias do banco de dados
exports.findAll = (req, res) => {
    Categoria.findAll()
        .then(categorias => {
            return res.status(200).json(categorias);
        })
        .catch(error => {
            return res.status(500).json({ error: 'Erro ao buscar categorias.' });
        });
};

// Encontra uma única categoria pelo ID
exports.findOne = (req, res) => {
    Categoria.findByPk(req.params.id)
        .then(categoria => {
            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada.' });
            }
            return res.status(200).json(categoria);
        })
        .catch(error => {
            return res.status(500).json({ error: 'Erro ao buscar categoria.' });
        });
};

// Atualiza uma categoria pelo ID
exports.update = (req, res) => {
    Categoria.findByPk(req.params.id)
        .then(categoria => {
            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada.' });
            }
            return categoria.update(req.body);
        })
        .then(updatedCategoria => {
            return res.status(200).json(updatedCategoria);
        })
        .catch(error => {
            return res.status(500).json({ error: 'Erro ao atualizar categoria.' });
        });
};

// Exclui uma categoria pelo ID
exports.deleteOne = (req, res) => {
    Categoria.findByPk(req.params.id)
        .then(categoria => {
            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada.' });
            }
            return categoria.destroy();
        })
        .then(() => {
            return res.status(200).json({ message: 'Categoria deletada com sucesso.' });
        })
        .catch(error => {
            return res.status(500).json({ error: 'Erro ao excluir categoria.' });
        });
};

// Exclui todas as categorias do banco de dados
exports.deleteAll = (req, res) => {
    Categoria.destroy({ where: {} })
        .then(() => {
            return res.status(200).json({ message: 'Todas as categorias foram deletadas com sucesso.' });
        })
        .catch(error => {
            return res.status(500).json({ error: 'Erro ao excluir categorias.' });
        });
};
