const { User } = require('../models');

class UserRepository{

    async findByEmail(email) {
        return await User.findOne({ 
            where: { email }
        });

    }

    async createUser(email, pswd, name, phoneNumber, address){
        try{
            User.create({
            email,
            password: pswd,
            name: name,
            phoneNumber: phoneNumber,
            address: address,
        });
        }
        catch(err){
            throw Error();
        }
        
    }
}

module.exports = new UserRepository();
