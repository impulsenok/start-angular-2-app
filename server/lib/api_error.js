const errors = {

    API_REQUEST_ERROR: {
        status: 500,
        message: "Error send request to api",
        level: 'warn'
    },

    LOGOUT_REQUEST_ERROR: {
        status: 500,
        message: "Error send request to api",
        level: 'warn'
    },

    VALIDATE_TOKEN_REQUEST_ERROR: {
        status: 500,
        message: "Error send request to api",
        level: 'warn'
    },

    NOT_FIND: {
        status: 404,
        message: "Url not find",
        level: 'warn'
    },

    LOGIN_OR_PASSWORD_INCORRECT: {
        status: 401,
        message: "Login or password incorrect",
        level: 'warn'
    }
};

class ApiError extends Error {
    constructor(code) {
        super(code);
        if(typeof(code) === "object"){
            this.code = code.code;
            this.message = code.message;
            this.status = code.status;
            this.level = "error";
        } else if (errors[code]) {
            this.code = code;
            this.message = errors[code].message;
            this.status = errors[code].status;
            this.level = errors[code].level;
        } else {
            this.code="ERROR";
            this.message = "Undefined error has been occured!";
            this.status = 500;
            this.level = "error";
        }
    }
}

class LoginError extends ApiError {
    constructor(code) {
        super(code);
    }
}

class LogoutError extends ApiError {
    constructor(code) {
        super(code);
    }
}

ApiError.LoginError = LoginError;
ApiError.LogoutError = LogoutError;

module.exports = ApiError;
