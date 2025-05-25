const repo = require("../repository/petRepository");

class petService{

  async getPetByUserId(userId){
    const pet = await repo.findByUserId(userId);
    return pet;
  }

  async createPet(name, breed, age, personality, userId) {
    return await repo.createPet(name, breed, age, personality, userId);
  }
}

module.exports = new petService();
