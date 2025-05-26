const repo = require('../repository/MatchingRepository');
const repoPet = require('../repository/PetRepository');
const { EmptyPetError } = require('../errors/PetError')
class MatchingService{

    async saveRequest(startAt, endAt, petId, requesterId){
        console.log("saveRequest를 시작합니다.");
        const pet = await repoPet.findByUserId(requesterId);
        if(!pet) {
            throw new EmptyPetError();
        }
        console.log(startAt, endAt, pet.id, requesterId);
        return await repo.savePetCareRequest(startAt, endAt, pet.id, requesterId);

    }
}







module.exports = new MatchingService();
