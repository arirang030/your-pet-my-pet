const { User } = require('../models');
const { AuthError } = require('../errors/AuthError');

class userRepository{

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async createUser(email, password, name, phoneNumber, address) {
    try{
      User.create({
        email,
        password,
        name,
        phoneNumber,
        address,
      });
    }
    catch (err){
      throw AuthError();
    }
  }

}

module.exports = new userRepository();