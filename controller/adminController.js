const verifyService = require('../services/verifyService');
const adminService = require('../services/adminService');
const { AdminError } = require('../errors/AdminError');

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
    return res.status(500).json({
      message: "검증 요청 리스트를 불러오는 과정에서 오류가 발생했습니다.",
      success: false,
    });
  }
};

exports.grantBadge = async (req, res) => {
  try {
    const { verificationId, isGranted } = req.body;
    const result = await adminService.processBadgeGranting(verificationId, isGranted);
    return res.json({
      message: result.message,
      success: true,
      user: result.user,
    });
  } catch (err) {
    console.error(err);
    if (err instanceof AdminError) {
      return res.status(err.status).json({
        message: err.message,
        success: err.success,
      });
    };
    return res.status(500).json({
      message: "관리자가 검증 요청을 처리하는 과정에서 오류가 발생했습니다.",
      success: false,
    });
  };
};