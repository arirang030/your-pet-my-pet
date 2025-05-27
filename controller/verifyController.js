exports.requestVerification = async (req, res) => {
  try {
    const { file, body, user } = req;
    const result = await verifyService.handleVerificationRequest(file, body.description, user.id);

    return res.json({
      message: result.message,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).json({
      message: err.message || "검증 요청 중 오류가 발생했습니다.",
      success: false,
    });
  }
};

exports.checkVerificationResult = async (req, res) => {
  try {
    const result = await verifyService.handleVerificationCheck(req.user.id, req.user.email);

    return res.json({
      message: result.message,
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).json({
      message: err.message || "검증 결과 확인 중 오류가 발생했습니다.",
      success: false,
    });
  }
};
