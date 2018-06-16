module.exports = (sequelize, DataType) => {
    const Tasks = sequelize.define('Tasks', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    // Definindo o relacionamento
    Tasks.associate = models => {
        // Fala q a tarefa pertence ao usuário
        Tasks.belongsTo(models.Users);
    };

    return Tasks;
};