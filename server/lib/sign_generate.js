const Promise = require('bluebird');
const config  = require('config');
const crypto  = require('crypto');
const cacher  = require('server/lib/cacher');
const ApiError= require('server/lib/api_error');

class Generate {

    constructor() {}

    static appSign (req) {
        if (req.session.user) {
            req.headers['X-eSchool-Token'] = req.session.token ? this._makeCipher(req.session.token) : undefined;
            return Promise.resolve();
        } else {
            return Promise.resolve();
        }
    }

    static generateUserDataSign (data) {
        return this._makeCipher(data.login + ';' + data.password + ';' + data.sessionID);
    }

    static generateSmsData (data) {
        return this._makeCipher(data.sms);
    }

    static generateInvitationCodeData (data) {
        return this._makeCipher(data);
    }

    static generateCreatePasswordData(data, userId) {
        return this._makeCipher(userId + ';' + data.password);
    }

    static generateHeadersForRequest(headers) {
        return {
            ['X-eSchool-Device']: headers['X-eSchool-Device'] ? headers['X-eSchool-Device'] : config.get('device'),
            ['X-eSchool-Token']: headers['X-eSchool-Token'] ? headers['X-eSchool-Token'] : undefined,
            ['X-eSchool-Locale']: headers['locale'] ? headers['locale'] : config.get('locale').default
        }
    }

    static _makeCipher (stringToCipher) {

        let cipher = crypto.createCipheriv(config.get('token').algorithm, config.get('token').key, config.get('token').iv);

        let crypted = cipher.update(stringToCipher, 'utf8', 'hex');

        crypted += cipher.final('hex');

        return crypted;
    }

    static _decryptChiper(data) {

        let decipher = crypto.createDecipheriv(config.get('token').algorithm, config.get('token').key, config.get('token').iv);
        let dec = null;

        if (!decipher) {
            return Promise.reject(new ApiError.LoginError('AUTO_SIGN_IN'));
        }

        try {
            dec = decipher.update(data, 'hex', 'utf8');
        } catch(e) {
            return Promise.reject(new ApiError.LoginError('AUTO_SIGN_IN'));
        }

        if (!dec) {
            return Promise.reject(new ApiError.LoginError('AUTO_SIGN_IN'));
        }

        dec += decipher.final('utf8');

        return JSON.parse(dec);
    }

    static generateRequestSign (data) {
        return crypto.createHmac('sha256', config.get('signature').secret).update(data.dataToSign).digest('hex');
    }
}


module.exports = Generate;