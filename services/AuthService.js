const repo = require("../repository/UserRepository");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { DuplicateUserError } = require("../errors/AuthError");
class AuthService{
    
    async getUserByEmail(email) {
        const user = await repo.findByEmail(email);
        return user;
    }

    async registerUser(user, email, password){
        try{
            const exUser = await this.getUserByEmail(email);

            if (exUser) throw new DuplicateUserError();

            const hash = await bcrypt.hash(password, 12);

            await repo.createUser(email, hash, user.body.name, user.body.phoneNumber, user.body.address);

        } catch (err){
            throw Error();
        }
        

        
    }
}

module.exports = new AuthService();
