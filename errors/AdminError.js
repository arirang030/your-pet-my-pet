class AdminError extends Error {
  constructor(msg='관리자 계정에서 오류가 발생했습니다.', status=500) {
    super(msg);
    this.name = 'AdminError';
    this.status = status;
    this.success = false;
  };
};

module.exports = { AdminError };