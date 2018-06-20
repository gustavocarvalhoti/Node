var mysql = require('mysql');

function createDBConnection() {
  //console.log('ENV: ' + process.env.NODE_ENV);

  if (!process.env.NODE_ENV || process.env.node === 'dev') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'padtec',
      database: 'casadocodigo_nodejs'
    });
  }

  if (process.env.NODE_ENV == 'test') {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'padtec',
      database: 'casadocodigo_nodejs_test'
    });
  }
}

// Wrapper - embrulha a outra função
module.exports = function () {
  return createDBConnection;
};
