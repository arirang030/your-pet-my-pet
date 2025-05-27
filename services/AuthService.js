const repo = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DuplicateUserError, IncorrectPasswordError, UnregisteredEmailError } = require("../errors/AuthError");

class authService{

  // 유저 생성
  async registerUser(email, password, name, phoneNumber, address) {
    // 이미 가입된 이메일인지 확인
    const exUser = await this.getUserByEmail(email);
    if (exUser) throw new DuplicateUserError();
    // 비밀번호 암호화
    const hash = await bcrypt.hash(password, 12);
    return await repo.createUser(email, hash, name, phoneNumber, address);
  }
  
  // 이메일로 유저 정보 가져오기
  async getUserByEmail(email) {
    return await repo.findByEmail(email);
  }

  // 로그인
  async login(email, password){
    try{
      // 이메일을 통해 해당 유저 정보 불러오기
      const exUser = await this.getUserByEmail(email);
      if (!exUser) throw new UnregisteredEmailError();
      // 입력한 비밀번호와 DB에 저장된 비밀번호 대조
      const result = await bcrypt.compare(password, exUser.password);
      if (!result) throw new IncorrectPasswordError();
      // 토큰 생성 (유효 기간: 하루)
      const token = jwt.sign(
        { id: exUser.id, email: exUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d"},
        );
      return token;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = new authService();