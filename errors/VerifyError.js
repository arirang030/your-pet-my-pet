class VerificationError extends Error {
  constructor(msg='검증 요청 관련 문제가 발생했습니다.', status=500) {
    super(msg, status);
    this.name = 'VerificationError';
    this.status = status;
    this.success = false;
  };
};

class VerificationNotFoundError extends VerificationError {
  constructor() {
    super('검증 요청 이력이 없습니다.', 404);
    this.name = 'VerificationNotFoundError';
  }
}

module.exports = { VerificationError, VerificationNotFoundError };
