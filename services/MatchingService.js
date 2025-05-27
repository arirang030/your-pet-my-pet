const repoMatching = require('../repository/MatchingRepository');
const repoPet = require('../repository/PetRepository');
const repoUser = require('../repository/UserRepository');
const { EmptyPetError } = require('../errors/PetError')
class MatchingService {

    //요청사항 저장
    async saveRequest(startAt, endAt, petId, requesterId) {
        //console.log("saveRequest를 시작합니다.");
        const pet = await repoPet.findByUserId(requesterId);
        if (!pet) {
            throw new EmptyPetError();
        }
        console.log(startAt, endAt, pet.id, requesterId);
        return await repoMatching.savePetCareRequest(startAt, endAt, pet.id, requesterId);

    }

    //매칭진행
    async makeMatching(requesterId) {

        try {
            const careRequests = await repoMatching.getAllPetCareRequestById(requesterId);


            if (careRequests.length == 0) throw Error("진행중인 매칭이 없습니다.");

            const caregivers = await repoUser.getCaregiversByRequest();


            //request는 한개만 있다고 가정.
            const request = careRequests[0];
            await repoMatching.saveMatching(requesterId, caregivers[0].id, request.id);
        } catch (err) {
            throw err;
        }

    }

    //미완성
    async makeReservation(userId) {

        try {
            const match = await repoMatching.getMatchingById(userId);

            if (match.length == 0) throw Error("확정중인 매칭칭내역이 없습니다.");

            //테스트상황 가정
            const mt = match[0];
            const mtInfo = await repoMatching.getPetCareRequestByReqId(mt.requestId);
            if (mt.status == "matched") {

                await repoMatching.saveReservation(mtInfo.startTime, mtInfo.endTime, mt.id);

            }
        } catch(err){
            throw err;
        }
    }
}







module.exports = new MatchingService();
