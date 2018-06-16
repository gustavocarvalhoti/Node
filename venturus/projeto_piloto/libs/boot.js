module.exports = app => {
    // Verifica se o DB está OK
    //app.db.sync()

    // Deleta tudo e cria denovo
    //app.db.sequelize.sync({force: true})
    app.db.sequelize.sync()
        .done(() => {
            // Se deu certo lista esse
            const port = app.get('port');
            app.listen(port, () => console.log(`Bootcamp API rodando na porta ${port}`));
        });
};