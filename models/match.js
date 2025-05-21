module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    matchedAt: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('requested', 'matched', 'cancelled'), allowNull: false },
  }, {
    tableName: 'match',
    timestamps: false,
  });

  Match.associate = models => {
    Match.belongsTo(models.User, { foreignKey: 'requesterId', as: 'Requester' });
    Match.belongsTo(models.User, { foreignKey: 'caregiverId', as: 'Caregiver' });
    Match.belongsTo(models.PetCareReq, { foreignKey: 'requestId' });
    Match.hasOne(models.Reservation, { foreignKey: 'matchId' });
  };

  return Match;
};
