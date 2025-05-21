module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
  }, {
    tableName: 'reservation',
    timestamps: false,
  });

  Reservation.associate = models => {
    Reservation.belongsTo(models.Match, { foreignKey: 'matchId' });
  };

  return Reservation;
};
