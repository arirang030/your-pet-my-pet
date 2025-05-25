const repo = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DuplicateUserError, IncorrectPasswordError, UnregisteredEmailError,JoinError } = require("../errors/AuthError");

class authService{
    
    async getUserByEmail(email) {
        const user = await repo.findByEmail(email);
        return user;
    }

    async registerUser(email, password, name, phoneNumber, address) {
        
            const exUser = await this.checkEmailExists(email);

            if (exUser) throw new DuplicateUserError();


    const hash = await bcrypt.hash(password, 12);
    return await repo.createUser(email, hash, name, phoneNumber, address);

  }
    
  async checkEmailExists(email) {
    return await repo.findByEmail(email);
  }

  async login(email, password){

        try{
            const exUser = await this.getUserByEmail(email);

            if (!exUser) throw new UnregisteredEmailError();

            const result = await bcrypt.compare(password, exUser.password);

            if (!result) throw new IncorrectPasswordError();

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