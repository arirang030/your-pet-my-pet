module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    phoneNumber: { type: DataTypes.STRING(20), allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    hasBadge: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    availableStart: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    availableEnd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
  }, {
    tableName: 'users',
    timestamps: false,
  });

  User.associate = models => {
    User.hasMany(models.Pet, { foreignKey: 'userId' });
    User.hasMany(models.Matching, { foreignKey: 'requesterId', as: 'RequestedMatches' });
    User.hasMany(models.Matching, { foreignKey: 'caregiverId', as: 'CaregiverMatches' });
    User.hasMany(models.PetCareReq, { foreignKey: 'requesterId' });
    User.hasOne(models.Verification, { foreignKey: 'userId' });
  };

  return User;
};
