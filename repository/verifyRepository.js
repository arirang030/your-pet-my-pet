const { Verification } = require('../models');

class verifyRepository {
  // 인증 자료 파일 업로드
  async uploadFile(file, description, userId) {
    return await Verification.create({
      img_url: file.filename,
      description,
      userId,
    });
  };
  // 인증 자료 전체 가져오기
  async findFiles() {
    return await Verification.findAll();
  }
  // 특정 인증 자료 가져오기
  async findAFile(userId) {
    return await Verification.findOne({ where: { userId } });
  }
};

module.exports = new verifyRepository();