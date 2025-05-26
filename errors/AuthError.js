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
  constructor(msg='로그인 중 문제가 발생했습니다.', status=500) {
    super(msg, status);
    this.name = 'LoginError';
  }
}

class UnregisteredEmailError extends LoginError {
    constructor(){
        super('가입되지 않은 이메일입니다.', 409);
        this.name = 'UnregisteredEmailError';
        this.success = false;
    }
}

class IncorrectPasswordError extends LoginError {
    constructor(){
        super('비밀번호가 일치하지 않습니다.', 409);
        this.name = 'IncorrectPasswordError';
        this.success = false;
    }
}

module.exports = {
    AuthError, 
    DuplicateUserError,
    UnregisteredEmailError,
    IncorrectPasswordError,
    JoinError,
    LoginError
}