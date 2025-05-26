
class PetError extends Error{

    constructor(msg='펫 인증 과정에서 문제가 발생했습니다.', status=500) {
    super(msg);
    this.name = 'PetError';
    this.status = status;
    this.success = false;
  }
}

class EmptyPetError extends PetError{
    constructor(msg='현재 등록된 펫이 존재하지 않습니다.', status=409){
    super(msg, status);
    this.name = 'EmptyPetError';
  };
}

module.exports = {
    EmptyPetError
}