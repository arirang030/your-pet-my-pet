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
      });
    }
    catch (err){
      throw new AuthError();
    }
  }

  async findUserProfile(userId){

    return await User.findOne({
      where: { id: userId },
      attributes: ['email', 'name', 'phoneNumber', 'address'],
    })
  }

}

module.exports = new userRepository();