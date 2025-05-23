const repo = require("../repository/UserRepository")

class AuthService{

    async getUserByEmail(email) {
        const user = await repo.findByEmail(email);
        return user;
    }

}

module.exports = new AuthService();
