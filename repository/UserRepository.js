const { User } = require('../models');
const { AuthError } = require('../errors/AuthError');

class userRepository{

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async createUser(email, password, name, phoneNumber, address) {
    try{
      await User.create({
        email,
        password,
        name,
        phoneNumber,
        address,
        role: 'user', // 웹을 통해 회원 가입 시에는 무조건 user로 가입하도록
      });
    }
    catch (err){
      throw new AuthError();
    }
  }

}

module.exports = new userRepository();