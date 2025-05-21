module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: { type: DataTypes.STRING(100), allowNull: false },
    breed: { type: DataTypes.STRING(100), allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    personality: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'pets',
    timestamps: false,
    paranoid: true,
  });

  Pet.associate = models => {
    Pet.belongsTo(models.User, { foreignKey: 'userId' });
    Pet.hasMany(models.Vaccination, { foreignKey: 'petId' });
    Pet.hasMany(models.PetCareReq, { foreignKey: 'petId' });
  };

  return Pet;
};
