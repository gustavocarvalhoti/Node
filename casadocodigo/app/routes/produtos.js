// Exporta o modulo
/*
module.exports = app.get('/produtos', function (req, res) {
  res.render("produtos/lista");
});
*/
//var connectionFactory = require('../infra/connectionFactory');

module.exports = function (app) {
    const urlProdutos = '/produtos';
    const urlProdutosForm = urlProdutos + '/form';

    app.get(urlProdutos, function (req, res) {
        /*
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'teste',
            database: 'casadocodigo_nodejs'
        });

        const connection = app.infra.connectionFactory();
        connection.query('select * from livros', function (err, results) {
            res.render('produtos/lista', {lista: results});
        });
        */

        const connection = app.infra.connectionFactory();
        // Chama o produtosBanco
        var produtosDAO = new app.infra.produtosDAO(connection);

        // Faz o select
        produtosDAO.lista(function (err, results) {
            res.format({
                html: function () {
                    res.render('produtos/lista', {lista: results});
                },
                json: function () {
                    res.json(results)
                }
            });
        });
        connection.end();

    });

    app.get(urlProdutosForm, function (req, res) {
        res.render('produtos/form');
    });

    app.post(urlProdutos, function (req, res) {
        var produto = req.body;
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);

        var validatorTitulo = req.assert('titulo', 'Titulo é obrigatório');
        validatorTitulo.notEmpty();

        var erros = req.validationErrors();
        if (erros) {
            console.log(erros);
            res.redirect(urlProdutosForm);
            return;
        }

        produtosDAO.save(produto, function (erros, resultados) {
            // Redirect
            res.redirect(urlProdutos);
        });
    });
};