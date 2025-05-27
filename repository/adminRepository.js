const { AdminError } = require('../errors/AdminError');
const { Verification, User } = require('../models');

class adminRepository {

  // 관리자가 해당 검증 요청 확인
  async markRequestAsChecked(verificationId) {
    const request = await Verification.findByPk(verificationId);
    if (!request) throw new AdminError('요청을 찾을 수 없습니다.', 404);
    request.isChecked = true;
    await request.save();
    return request;
  };

  // 관리자가 해당 검증 요청 승인
  async grantUserBadge(userId) {
    const user = await User.findByPk(userId);
    user.hasBadge = 1;
    await user.save();
    return user;
  };

};

module.exports = new adminRepository();