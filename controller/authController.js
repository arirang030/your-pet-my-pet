const { AuthError, DuplicateUserError, UnregisteredEmailError, IncorrectPasswordError } = require("../errors/AuthError");
const { InvalidConnectionError } = require('sequelize');
const  service  = require('../services/authService');
const { JoinError } = require("../errors/AuthError");

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

    if (err instanceof DuplicateUserError){
      return res.json({
        message: err.message,
        success: err.success,
      })
    }
    else if (err instanceof AuthError){
      return res.json({
        message: err.message,
        success: err.success,
      })
    }
    else{
      return res.json({
      message: '회원 가입 중 에러 발생',
      success: false,
    });
    }
    
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //service 호출
    const token = await service.login(email, password);

    return res.json({
      message: '로그인 성공!',
      success: true,
      token,
    });
  } catch (err) {
    console.error(err);
    if (err instanceof UnregisteredEmailError){
      return res.json({
      message: err.message,
      success: false,
    });
    }
    else if (err instanceof IncorrectPasswordError){
      return res.json({
      message: err.message,
      success: false,
    });
    }
    else{
      return res.json({
      message: '로그인 중 에러 발생',
      success: false,
    });
    }
    
  };
};