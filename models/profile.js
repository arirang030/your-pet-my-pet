module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    phoneNumber: { type: DataTypes.STRING(20), allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    img_url: { type: DataTypes.STRING, allowNull: false },
    hasBadge: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
  }, {
    tableName: 'profiles',
    timestamps: false,
  });

  Profile.associate = models => {
    Profile.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Profile;
};