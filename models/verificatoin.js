module.exports = (sequelize, DataTypes) => {
  const Verification =  sequelize.define('Verification', {
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    tableName: 'verifications',
    timestamps: false,
  });

    Verification.associate = models => {
    Verification.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Verification;
}