module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
  }, {
    tableName: 'users',
    timestamps: false,
  });

  User.associate = models => {
    User.hasOne(models.Profile, { foreignKey: 'userId' });
    User.hasMany(models.Pet, { foreignKey: 'userId' });
    User.hasMany(models.Match, { foreignKey: 'requesterId', as: 'RequestedMatches' });
    User.hasMany(models.Match, { foreignKey: 'caregiverId', as: 'CaregiverMatches' });
    User.hasMany(models.PetCareReq, { foreignKey: 'requesterId' });
    User.hasOne(models.Verification, { foreignKey: 'userId' });
  };

  return User;
};
