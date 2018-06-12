var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'padtec',
        database: 'casadocodigo_nodejs'
    });
}

// Wrapper - embrulha a outra função
module.exports = function () {
    return createDBConnection;
};
