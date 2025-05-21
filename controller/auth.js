const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.join = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.json({
      message: '이메일 혹은 비밀번호 미입력',
      success: false,
    });
  };
  if (email.includes(" ") || password.includes(" ")) {
    return res.json({
      message: '이메일 혹은 비밀번호에 공백이 포함되어 있습니다.',
      success: false,
    });
  };
  try {
    const exUser = await User.findOne({ where: { email }});
    if (exUser) {
      return res.json({
        message: '이미 가입된 회원입니다.',
        success: false,
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: hash,
      name,
    });
    return res.json({
      message: '회원 가입이 완료되었습니다.',
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: '회원 가입 중 에러 발생',
      success: false,
    });
  };
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (!exUser) {
      return res.json({
        message: '가입되지 않은 이메일입니다.',
        success: false,
      });
    };
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