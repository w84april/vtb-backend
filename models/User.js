module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      items: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      helmet: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      armor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      firstWeapon: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      secondWeapon: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      privateKey: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      publicKey: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
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

  User.associate = models => {
    User.belongsToMany(models.Event, { through: 'User_Event' });
  };

  return User;
};
