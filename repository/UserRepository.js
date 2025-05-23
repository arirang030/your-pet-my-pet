const { User } = require('../models');

class UserRepository{

    async findByEmail(email) {
        return await User.findOne({ 
            where: { email }
        });

    }
}

module.exports = new UserRepository();
