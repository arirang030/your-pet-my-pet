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
    return await Verification.findAll({ where: { isChecked: false } });
  }
  // userId 인증 자료 가져오기
  async findByUserId(userId) {
    return await Verification.findOne({ where: { userId } });
  }
  // id로 인증 자료 가져오기
  async findByVerificationId(verificationId) {
    return await Verification.findOne({ where: { id: verificationId }});
  }
};

module.exports = new verifyRepository();