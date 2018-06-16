const bodyParser = require('body-parser');

module.exports = app => {
    // Seta a porta no app para pegar depois
    app.set('port', 3000);
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
};