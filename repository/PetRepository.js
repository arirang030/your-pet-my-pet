const { Pet } = require('../models');

class petRepository{

  async findByUserId(userId){
    return await Pet.findOne({ where: { userId } });
  }

  async createPet(name, breed, age, personality, userId) {
    return await Pet.create({
      name,
      breed,
      age,
      personality,
      userId,
    });
  };
}

module.exports = new petRepository();
