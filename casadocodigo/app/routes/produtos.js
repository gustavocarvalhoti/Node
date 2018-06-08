// Exporta o modulo
/*
module.exports = app.get('/produtos', function (req, res) {
  res.render("produtos/lista");
});
*/
//var connectionFactory = require('../infra/connectionFactory');

module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        /*
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'teste',
            database: 'casadocodigo_nodejs'
        });
        */

        var connection = app.infra.connectionFactory();
        connection.query('select * from livros', function (err, results) {
            res.render('produtos/lista', {lista: results});
        });
        connection.end();
    });
};