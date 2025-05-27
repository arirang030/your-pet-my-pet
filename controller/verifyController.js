const verifyService = require('../services/verifyService');
const petService = require('../services/petService');
const authService = require('../services/AuthService');
const { VerificationError } = require('../errors/VerifyError');

exports.requestVerification = async (req, res) => {
  try {
    const file = req.file;
    const description = req.body.description;
    const userId = req.user.id;
    
    // req 전처리
    if (!file || !description) {
      throw new VerificationError('모든 필드를 입력해 주세요.', 400);
    };
  
    // Service 호출
    // 펫 등록 여부 검사
    const hasPet = await petService.getPetByUserId(userId);
    if (!hasPet) {
      throw new VerificationError('등록된 펫이 있어야 검증 요청이 가능합니다.', 400);
    };
    // 인증 자료 파일 업로드
    await verifyService.uploadFile(file, description, userId);
  
    return res.json({
      message: "검증이 요청되었습니다.",
      success: true,
    });
  } catch (err) {
    console.error(err);
    if (err instanceof VerificationError) {
      return res.status(err.status).json({
        message: err.message,
        success: err.success,
      });
    };
    return res.status(500).json({
      message: "검증을 요청하는 과정에서 오류가 발생했습니다.",
      success: false,
    });
  };
};

exports.checkVerificationResult = async (req, res) => {
  try {
    const isChecked = await verifyService.checkVerified(req.user.id);
    if (!isChecked) {
      return res.json({
        message: "아직 요청이 처리되지 않았습니다.",
        success: true,
      });
    };
    const user = await authService.getUserByEmail(req.user.email);
    if (user.hasBadge == 1) {
      return res.json({
        message: "뱃지를 획득했습니다!",
        success: true,
      });
    } else {
      return res.json({
        message: "뱃지를 획득하지 못했습니다.",
        success: true,
      });
    };
  } catch (err) {
    console.error(err);
    if (err instanceof VerificationError) {
      return res.status(err.status).json({
        message: err.message,
        success: err.success,
      });
    };
    return res.status(500).json({
      message: "검증 결과를 확인하는 과정에서 오류가 발생했습니다.",
      success: false,
    });
  };
};