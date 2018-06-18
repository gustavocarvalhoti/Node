// Passa o nosso Servidor para o supertest
var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosControllerNewSupertest', function () {
    // Nesse não precisa do assert
    it('#listagem json', function (done) {
        request.get('/produtos') // Get
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/) // Retorna Json
            .expect(200, done); // Verifica se o retorno é 200 e finaliza
    });
});