// Retorna sempre a mesma versão do objeto
var express = require('express');
var load = require('express-load');
var app = express();

module.exports = function () {
    // Para utilizar paginas dinamicas
    app.set('view engine', 'ejs');
    // Mostra onde procurar as views
    app.set('views', './app/views');

    // Lista os que serão carregados automaticamente dentro do app
    // cwd: 'app -> Buscar a partir dessa pastas
    // Carrega tudo desntro da pasta app/routes e infra
    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    return app;
};