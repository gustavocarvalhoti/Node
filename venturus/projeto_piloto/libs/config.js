module.exports = {
    database: 'bootcamp',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'bootcamp.sqlite',
        define: {
            underscored: true   // Deixa lowercase e coloca "_" na tabela meu_livro
        }
    },
    jwtSecret: 'B007C4MP',       // Não pode vazar essa chave, não deixar no codigo
    jwtSession: {
        session: false
    }
};