const repo = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const { DuplicateUserError, JoinError } = require("../errors/AuthError");

class authService {
  async registerUser(email, password, name, phoneNumber, address) {
    const exUser = await this.checkEmailExists(email);
    if (exUser) throw new DuplicateUserError();

    const hash = await bcrypt.hash(password, 12);
    return await this.createUser(email, hash, name, phoneNumber, address);
  }

  async checkEmailExists(email) {
    return await repo.findByEmail(email);
  }

  async createUser(email, password, name, phoneNumber, address) {
    return await repo.createUser(email, password, name, phoneNumber, address);
  }
}


module.exports = new authService();