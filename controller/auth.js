const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const { User } = require('../models');
const  service  = require('../services/AuthService');
const { AuthError, DuplicateUserError, UnregisteredEmailError, IncorrectPasswordError } = require("../errors/AuthError");
const { InvalidConnectionError } = require('sequelize');

exports.join = async (req, res) => {
  try{
    // req전처리
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AuthError('이메일 혹은 비밀번호 미입력', 400);
    };
    if (email.includes(" ") || password.includes(" ")) {
      throw new AuthError('입력값에 공백이 포함되어있습니다.', 400);
    };

    // Service 호출
    await service.registerUser(req,email, password);
    
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
  // req 전처리
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