module.exports = (sequelize, DataTypes) => {
  const Matching = sequelize.define('Matching', {
    matchedAt: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('requested', 'matched', 'cancelled'), allowNull: false },
  }, {
    tableName: 'matching',
    timestamps: false,
  });

  Matching.associate = models => {
    Matching.belongsTo(models.User, { foreignKey: 'requesterId', as: 'Requester' });
    Matching.belongsTo(models.User, { foreignKey: 'caregiverId', as: 'Caregiver' });
    Matching.belongsTo(models.PetCareReq, { foreignKey: 'requestId' });
    Matching.hasOne(models.Reservation, { foreignKey: 'matchId' });
  };

  return Matching;
};
