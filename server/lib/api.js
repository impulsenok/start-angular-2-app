const Promise       = require('bluebird');
const config        = require('config');
const signGenerate  = require('server/lib/sign_generate');
const ApiError      = require('server/lib/api_error');
const sendRequest   = require('server/lib/send_request');

class Api {
    constructor() {}

                                    // LOGIN SECTION

    static login(req) {

        req.body.sessionID = req.sessionID;

        return sendRequest.requestApi("GET", {
            url: `${config.get('api').url}/login`,
            headers: signGenerate.generateHeadersForRequest(req.headers),
            qs: { data: signGenerate.generateUserDataSign(req.body) }
        })
            .catch((e) => Promise.reject(new ApiError.LoginError(e)));
    }

    static logout(req) {
        return sendRequest.requestApi("POST", {
            url: `${config.get('api').url}/logout`,
            headers: signGenerate.generateHeadersForRequest(req.headers),
            // form: req.body.data
        })
            .catch((e) => Promise.reject(new ApiError.LogoutError(e)));
    }
}

module.exports = Api;
