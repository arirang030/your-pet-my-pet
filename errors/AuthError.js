class AuthError extends Error {
  constructor(msg='인증 과정에서 문제가 발생했습니다.', status=500) {
    super(msg);
    this.name = 'AuthError';
    this.status = status;
    this.success = false;
  }
}

class JoinError extends AuthError {
  constructor(msg='회원 가입 중 문제가 발생했습니다.', status=500){
    super(msg, status);
    this.name = 'JoinError';
  };
};

class DuplicateUserError extends JoinError {
  constructor(){
    super('이미 가입된 회원입니다.', 409);
    this.name = 'DuplicateUserError';
  };
};

class LoginError extends AuthError {
  constructor() {
    super('로그인 중 문제가 발생했습니다.', 500);
    this.name = 'LoginError';
  }
}

module.exports = { JoinError, DuplicateUserError, LoginError };