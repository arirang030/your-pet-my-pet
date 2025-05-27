const verifyService = require('../services/verifyService');

exports.examineVerificationRequest = async (req, res) => {
  try {
    const requestList = await verifyService.getFiles();
    return res.json({
      message: "사용자의 검증 요청 리스트를 불러옵니다.",
      success: true,
      requestList,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "검증 요청 리스트를 불러오는 과정에서 오류가 발생했습니다.",
      success: false,
    });
  }
};

// 이제 여기서부터 다시 하면 됨
exports.grantBadge = async (req, res) => {

};