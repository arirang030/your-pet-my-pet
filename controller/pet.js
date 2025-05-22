const { Pet } = require('../models');

exports.getPet = async (req, res) => {
  try {
    const userId = req.user.id;
    const pet = await Pet.findOne({ where: { userId } });
    if (!pet) {
      return res.json({
        message: "등록된 펫이 없습니다.",
        success: false,
      });
    };
    return res.json({
      message: "펫 정보를 불러옵니다.",
      success: true,
      pet,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "펫 정보를 불러오는 과정에서 오류가 발생했습니다.",
      success: false,
    });
  };
};

exports.postPet = async (req, res) => {
  try {
    const { name, breed, age, personality } = req.body;
    if (!name || !breed || !age || !personality) {
      return res.json({
        message: "모든 필드를 입력해주세요.",
        success: false,
      });
    }
    if (isNaN(age) || age < 0) {
      return res.json({
        message: "나이는 0 이상의 숫자여야 합니다.",
        success: false,
      });
    }
    const pet = await Pet.create({
      name,
      breed,
      age,
      personality,
      userId: req.user.id,
    });
    return res.json({
      message: "펫이 성공적으로 등록되었습니다.",
      success: true,
      pet,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "펫을 등록하는 과정에서 오류가 발생했습니다.",
      success: false,
    });
  };
};