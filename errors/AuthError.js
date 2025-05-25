class AuthError extends Error{
    constructor(msg='회원가입중 문제가 발생했습니다.', status = 500){
        super(msg);
        this.name = 'AuthError';
        this.status = status;
        this.success = false;
    }
}

class DuplicateUserError extends AuthError{
    constructor(){
        super('이미 가입된 회원입니다.');
        this.name = 'DuplicateUserError';
        this.status = 409;
        this.success = false;
    }
}

class UnregisteredEmailError extends AuthError{
    constructor(){
        super('가입되지 않은 이메일입니다.', 409);
        this.name = 'UnregisteredEmailError';
        this.success = false;
    }
}

class IncorrectPasswordError extends AuthError{
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
    IncorrectPasswordError
}