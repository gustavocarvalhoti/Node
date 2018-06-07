module.exports = function (app) {
  app.get('/', function (req, res) {
    // Aponta para home.js
    res.render("home");
  });
};