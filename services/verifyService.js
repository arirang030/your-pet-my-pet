const { VerificationError, VerificationNotFoundError } = require('../errors/VerifyError');
const repo = require('../repository/verifyRepository');
const petService = require('./petService');
const authService = require('./AuthService');

class VerifyService {

  // 검증 요청 처리
  async handleVerificationRequest(file, description, userId) {
    if (!file || !description) {
      throw new VerificationError('모든 필드를 입력해 주세요.', 400);
    }

    const hasPet = await petService.getPetByUserId(userId);
    if (!hasPet) {
      throw new VerificationError('등록된 펫이 있어야 검증 요청이 가능합니다.', 400);
    }

    await repo.uploadFile(file, description, userId);
    return { message: "검증이 요청되었습니다." };
  }

  // 검증 결과 확인 처리
  async handleVerificationCheck(userId, email) {
    const file = await repo.findByUserId(userId);
    if (!file) {
      throw new VerificationNotFoundError();
    }

    if (!file.isChecked) {
      return { message: "아직 요청이 처리되지 않았습니다." };
    }

    const user = await authService.getUserByEmail(email);
    const message = user.hasBadge === 1
      ? "뱃지를 획득했습니다!"
      : "뱃지를 획득하지 못했습니다.";

    return { message };
  }
}

module.exports = new VerifyService();