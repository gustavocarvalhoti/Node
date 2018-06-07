// Retorna sempre a mesma versão do objeto
var app = require('express')();
// Para utilizar paginas dinamicas
app.set('view engine', 'ejs');
// Mostra onde procurar as views
app.set('views','./app/views');

// Exporta o app
module.exports = function () {
    return app;
};