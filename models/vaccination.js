module.exports = (sequelize, DataTypes) => {
  const Vaccination = sequelize.define('Vaccination', {
    vaccineName: { type: DataTypes.STRING, allowNull: false },
    vaccinatedAt: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('success', 'fail'), allowNull: false },
  }, {
    tableName: 'vaccinations',
    timestamps: false,
  });

  Vaccination.associate = models => {
    Vaccination.belongsTo(models.Pet, { foreignKey: 'petId' });
  };

  return Vaccination;
};
