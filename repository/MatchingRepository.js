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
            throw new Error("DB접근오류");
        }
    }

    async getPetCareRequestByReqId(reqId){
        try{
            return await Request.findOne({
                where:{
                    id: reqId,
                }
            });
        } catch(err){
            throw new Error("DB접근오류");
        }
    }

    async getAllPetCareRequestById(userId){
        try{
            return await Request.findAll({
                where: {requesterId: userId}
            });
        } catch(err){
            throw new Error("DB접근오류");
        }
    }

    async getMatchingById(userId){
        try{
            return await Matching.findAll({
                where: {requesterId: userId}
            });
        } catch(err){
            throw new Error("DB접근오류");
        }
    }

    async getReservationById(userId){
        try{
            return await Reservation.findAll({
                where: {requesterId: userId}
            });
        } catch(err){
            throw new Error("DB접근오류");
        }
    }

    async saveMatching(reqId, giverId,requestId){
        try{
            return await Matching.create({
            matchedAt: new Date(),
            //초기상태는 'requested'
            //제공자가 매칭결과를 받아들였다고 가정.
            status: 'matched',
            requesterId: reqId,
            caregiverId: giverId,
            requestId: requestId,

            
        });
        } catch(err){
            console.log("MatchingRepository에서 문제 발생.");
            console.log(err.message);

            throw err;
        }
    }

    async saveReservation(startTime, endTime, matchId){
        try{
            return await Reservation.create({
                startTime: startTime,
                endTime: endTime,
                matchId: matchId,
        });
        } catch(err){
            console.log("MatchingRepository에서 문제 발생.");
            console.log(err.message);

            throw err;
        }
    }

}

module.exports = new MatchingRepository();

