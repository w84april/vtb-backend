module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'Event',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            middleAwardPower: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: 'User',
            freezeTableName: true,
        },
    );

    Event.associate = models => {
        Event.belongsToMany(models.User, { through: 'User_Event' });
    }

    return Event;
};