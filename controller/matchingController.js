const service = require('../services/MatchingService');
const { EmptyPetError } = require('../errors/PetError');


exports.postMatchingRequest = async (req, res) => {

    try {

        await service.saveRequest(req.body.startAt, req.body.endAt, null, req.user.id);
        return res.json({
                message: "해당 요청이 등록되었습니다.",
                success: true,
            });


    } catch (err) {
        //에러분기 필요
        console.log(err.message);

        if (err instanceof EmptyPetError) {
            return res.json({
                message: "등록된 펫이 없습니다.",
                success: false,
            });
        }
        else {
            console.log(err.message);
            return res.json({
                message: "케어요청에 실패했습니다.",
                success: false,
            });
        }

    }

}

exports.startMatching = async (req, res) => {

    try {
        await service.makeMatching(req.user.id);
        return res.json({
            message: "매칭성공! 예약확정을 기다려주세요.",
            success: true,
        })
    } catch (err) {
        console.log(err.message);
        return res.json({
            message: err.message,
            success: false,
        });
    }
}

exports.testMakeReservation = async (req, res) => {
    try {
        
    } catch (err) {
        
    }
}