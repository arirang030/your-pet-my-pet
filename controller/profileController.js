const repo = require('../repository/userRepository');

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    
    const profile = await repo.findUserProfile(userId);

    if (!profile) {
      return res.json({
        message: "해당 유저에 대한 정보가 없습니다.",
        success: false,
      });
    };
    return res.json({
      message: "해당 유저에 대한 정보를 불러옵니다.",
      success: true,
      profile,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: "프로필을 불러오는 과정에서 오류가 발생했습니다.",
      success: false,
    });
  };
};