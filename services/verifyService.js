const { VerificationNotFoundError } = require('../errors/VerifyError');
const repo = require('../repository/verifyRepository');

class verifyService {
  // 인증 자료 파일 업로드
  async uploadFile(file, description, userId) {
    return await repo.uploadFile(file, description, userId);
  };

  // DB에서 인증 자료 리스트 가져오기
  async getFiles() {
    return await repo.findFiles();
  }

  // 인증 자료 확인 여부 체크
  async checkVerified(userId) {
    const file = await repo.findByUserId(userId);
    if (!file) {
      throw new VerificationNotFoundError();
    }
    return file.isChecked;
  }
};

module.exports = new verifyService();