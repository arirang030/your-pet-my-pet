module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    timestamps: true, // createdAt, updatedAt 자동 생성
    tableName: 'users', // 실제 DB 테이블 이름
  });
  
  return User;
};