const { Pet } = require('../models');

class PetRepository{

    async findByUserId(userId){
        return await Pet.findOne({
            where: { userId }
        });

    }
}

module.exports = new PetRepository();
