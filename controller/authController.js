const { JoinError, LoginError } = require("../errors/AuthError");
const  service  = require('../services/AuthService');

exports.join = async (req, res) => {
  try{
    // req 전처리
    const { email, password, name, phoneNumber, address } = req.body;
    if (!email || !password || !name || !phoneNumber || !address) {
      throw new JoinError('모든 필드를 입력해 주세요.', 400);
    };
    if (email.includes(" ") || password.includes(" ")) {
      throw new JoinError('입력값에 공백이 포함되어있습니다.', 400);
    };

    // Service 호출
    await service.registerUser(email, password, name, phoneNumber, address);
    
    return res.json({
      message: '회원 가입이 완료되었습니다.',
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status).json({
      message: err.message,
      success: err.success,
    });
  };
};

exports.login = async (req, res) => {
  try {
    // req 전처리
    const { email, password } = req.body;
    if (!email || !password) {
      throw new LoginError('모든 필드를 입력해 주세요.', 400);
    };
    if (email.includes(" ") || password.includes(" ")) {
      throw new LoginError('입력값에 공백이 포함되어있습니다.', 400);
    };

    // Service 호출
    const token = await service.login(email, password);

    return res.json({
      message: '로그인 성공!',
      success: true,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(err.status).json(({
      message: err.message,
      success: err.success,
    }));
  };
};