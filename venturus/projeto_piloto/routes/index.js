module.exports = app => {
    app.get('/', (req, res) => {
        // Retorna um JSON
        res.json({status: "OK"})
    });

};