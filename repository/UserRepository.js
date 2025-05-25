const { User } = require('../models');

class UserRepository{

    async findByEmail(email) {
        return await User.findOne({ 
            where: { email }
        });

    }

    async createUser(email, pswd, name, phoneNumber, address){
        try{
            await User.create({
            email,
            password: pswd,
            name: name,
            phoneNumber: phoneNumber,
            address: address,
        });
        }
        catch(err){
            throw err;
        }
        
    }
}

module.exports = new UserRepository();
