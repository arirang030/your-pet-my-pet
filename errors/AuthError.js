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

module.exports = {AuthError, DuplicateUserError}