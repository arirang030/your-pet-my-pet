const { Matching } = require('../models');
const { PetCareReq } = require('../models');
const { Reservation } = require('../models');
const { Sequelize, sequelize } = require('../models');

class MatchingRepository {
    // -- MatchingService.js PSEUDO

    //1. Request에 접근해서 남은 Request를 큐에 저장
    //2. 하나씩 꺼내서 확인
    //3. 락 걸어
    //4. 매칭 진행.
    //5. 락풀어
    //6. 성공된 매칭은 Reservation에 저장. 

    //들어온 petCareRequest를 petCareReq에 저장.
    async savePetCareRequest(startAt, endAt, petId, requesterId){

        try{
            return await PetCareReq.create({
            startTime: startAt,
            endTime: endAt,
            petId: petId,
            requesterId: requesterId
        });
        } catch(err){
            throw err;
        }
    }

    async getAllPetCareRequest(){
        try{
            return await Request.findAll();
        } catch(err){
            throw new Error();
        }
    }

    async getAllPetCareRequestById(userId){
        try{
            return await Request.findAll({
                where: {requesterId: userId}
            });
        } catch(err){
            throw new Error();
        }
    }

}

module.exports = new MatchingRepository();

