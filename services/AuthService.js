const repo = require("../repository/UserRepository");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { DuplicateUserError, IncorrectPasswordError, UnregisteredEmailError } = require("../errors/AuthError");
class AuthService{
    
    async getUserByEmail(email) {
        const user = await repo.findByEmail(email);
        return user;
    }

    async registerUser(user, email, password) {
        try{
            const exUser = await this.getUserByEmail(email);

            if (exUser) throw new DuplicateUserError();

            const hash = await bcrypt.hash(password, 12);

            await repo.createUser(email, hash, user.body.name, user.body.phoneNumber, user.body.address);

        } catch (err){
            throw err;
        }  
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

module.exports = new AuthService();
