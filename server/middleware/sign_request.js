const signGenerate = require('server/lib/sign_generate');


class RequestSign {

    constructor() {

    }

    static signRequest() {

        return (req, res, next) => {

            return signGenerate.appSign(req)
                .then(() => {
                    return next();
                });
        }
    }
}

module.exports = RequestSign;