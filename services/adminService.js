const adminRepository = require("../repository/adminRepository");
const userRepository = require("../repository/userRepository");

class adminService {

  async processBadgeGranting(verificationId, isGranted) {
    const request = await adminRepository.markRequestAsChecked(verificationId);
    const userId = request.userId;

    if (isGranted) {
      const grantedUser = await adminRepository.grantUserBadge(userId);
      return {
        message: "관리자가 해당 사용자의 검증 요청을 승인하였습니다.",
        user: {
          id: grantedUser.id,
          name: grantedUser.name,
          hasBadge: grantedUser.hasBadge,
        },
      };
    } else {
      const rejectedUser = await userRepository.findById(userId);
      return {
        message: "관리자가 해당 사용자의 검증 요청을 거절하였습니다.",
        user: {
          id: rejectedUser.id,
          name: rejectedUser.name,
          hasBadge: rejectedUser.hasBadge,
        },
      };
    };
  };
};

module.exports = new adminService();