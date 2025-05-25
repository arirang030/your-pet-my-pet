const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
    return res.json({
      message: err.message,
      success: err.success,
    });
    // if (err instanceof AuthError){
    //   return res.json({
    //     message: err.message,
    //     success: err.success,
    //   });
    // };
    // return res.json({
    //   message: '회원 가입 중 에러 발생',
    //   success: false,
    // });
  };
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exUser = await service.checkEmailExists(email);
    if (!exUser) {
      return res.json({
        message: '가입되지 않은 이메일입니다.',
        success: false,
      });
    };

    // 암호화 비밀번호 대조
    const result = await bcrypt.compare(password, exUser.password);
    if (!result) {
      return res.json({
        message: '비밀번호가 일치하지 않습니다.',
        success: false,
      });
    };

    // 토큰 생성(유효 기간: 하루)
    const token = jwt.sign(
      { id: exUser.id, email: exUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d"},
    );

    return res.json({
      message: '로그인 성공!',
      success: true,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: '로그인 중 에러 발생',
      success: false,
    });
  };
};