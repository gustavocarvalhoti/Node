// Retorna sempre a mesma versão do objeto
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
    var app = express();
    // Para utilizar paginas dinamicas
    app.set('view engine', 'ejs');
    // Mostra onde procurar as views
    app.set('views', './app/views');

    // O urlencoded é o justamente o formato que o formulário envia os dados por default
    //app.use(bodyParser.urlencoded());
    // Melhor para interpretar inclusive formulários mais complexos
    app.use(bodyParser.urlencoded({extended: true}));
    // Para aceitar Json
    app.use(bodyParser.json());
    // Para utilizar o validador
    app.use(expressValidator());

    // Lista os que serão carregados automaticamente dentro do app
    // cwd: 'app -> Buscar a partir dessa pastas
    // Carrega tudo desntro da pasta app/routes e infra
    load('routes', {cwd: 'app'}).then('infra').into(app);

    return app;
};