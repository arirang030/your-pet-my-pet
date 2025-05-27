const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.json({
      message: '토큰이 없습니다.',
      success: false,
    });
  };
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.json({
      message: '유효하지 않은 토큰입니다.',
      success: false,
    });
  };
};

exports.isNotLoggedIn = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    next(); // 로그인이 안 된 상태 -> 다음 미들웨어 실행
  } else {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.json({
        message: '이미 로그인한 상태입니다.',
        success: false,
      });
    } catch (error) {
      // 토큰이 유효하지 않다면 로그인하지 않은 상태로 간주
      next();
    };
  };
};
