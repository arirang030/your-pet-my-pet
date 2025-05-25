const repo = require("../repository/PetRepository");

class PetService{

    async getPetByUserId(userId){
        const pet = await repo.findByUserId(userId);
        return pet;
    }
}

module.exports = new PetService();
