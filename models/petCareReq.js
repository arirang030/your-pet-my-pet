module.exports = (sequelize, DataTypes) => {
  const PetCareReq = sequelize.define('PetCareReq', {
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName: 'petCareReq',
    timestamps: false,
  });

  PetCareReq.associate = models => {
    PetCareReq.belongsTo(models.User, { foreignKey: 'requesterId' });
    PetCareReq.belongsTo(models.Pet, { foreignKey: 'petId' });
  };

  return PetCareReq;
};
