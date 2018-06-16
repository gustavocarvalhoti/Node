const operations = require('./operations');
const greeting = require('./greeting');
const operationsOther = require('./operations_other');

// Da para definir o que quer importar, ele importa só a function sum
const {sum} = require('./operations_other');

//console.log('Resultado: ' + operations.sum(1, 2));
//console.log('Resultado: ' + operations.subtraction(20, 1));

//console.log(greeting('Gustavo'));

//console.log('Resultado: ' + operationsOther.sum(1, 2));
//console.log('Resultado: ' + operationsOther.subtraction(10, 1));
//console.log('Resultado: ' + sum(1, 2));

/*
// FS é um modulo do core (Nativo) - Cria um arquivo
const fs = require('fs');
// Cria arquivo (name, conteudo)
fs.writeFileSync('bootamp.txt', 'Este é o conteúdo do arquivo.');
*/

/*
// Traz informações do CPU
const os = require('os');
//console.log(os.cpus());
console.log(os.totalmem());
console.log(os.type());
*/