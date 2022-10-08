module.exports = (sequelize, DataTypes) => {
    const UserEvent = sequelize.define(
        'User_Event',
        {
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                defaultValue: false
            },
            approve: {
                type: DataTypes.ENUM('pending', 'rejected', 'accepted'),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                defaultValue: 'pending'
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
            freezeTableName: true,
        },
    );

    return UserEvent;
};
