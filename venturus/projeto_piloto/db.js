const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Insciar o Sequelize
module.exports = app => {
    const config = app.libs.config;
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config.params
    );

    const db = {
        sequelize,
        models: {}
    };

    // _dirname - reservada do node, pega o diretorio da appp
    // Adiionou todas as entidades
    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        // Adiciona no models
        db.models[model.name] = model;
        console.log("Entidade adicionada: " + model);
    });

    // Verifica as ligações PK, FK
    Object.keys(db.models).forEach(key => {
        if (db.models[key].hasOwnProperty('associate')) {
            console.log("Associação: " + key);
            db.models[key].associate(db.models)
        }
    });

    return db;
};