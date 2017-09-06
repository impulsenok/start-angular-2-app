const Promise       = require('bluebird');
const request       = Promise.promisifyAll(require('request'));
const signGenerate  = require('server/lib/sign_generate');
const moment        = require('moment');
const URL           = require('url');
const QS            = require('querystring');

const ApiError      = require('server/lib/api_error');

class SendRequest {
    constructor() {}

    static requestApi(method, options) {

        let sender = '';
        let optionsToSign = {
            method: method
        };

        if(method == 'GET' || method == 'DEL') {

            options.qs = options.qs ? options.qs : {};

            // check if already has queryString
            if (URL.parse(options.url).query) options.qs = Object.assign(options.qs, QS.parse(URL.parse(options.url).query));

            //add timestamp
            options.qs.timestamp = moment().unix();

            //prepare data for sign
            optionsToSign.dataToSign = URL.parse(options.url).pathname.concat('?', QS.stringify(options.qs));
        } else {

            options.form = options.form ? options.form : {};
            options.form.timestamp = moment().unix();
            optionsToSign.dataToSign = URL.parse(options.url).pathname.concat(QS.stringify(options.form));
        }

        // create signature
        options.headers['X-eSchool-Signature'] = signGenerate.generateRequestSign(optionsToSign);

        switch(method){
            case "GET"    : sender = request.getAsync(options);  break;
            case "PUT"    : sender = request.putAsync(options);  break;
            case "DEL"    : sender = request.delAsync(options);  break;
            case "POST"   : sender = request.postAsync(options); break;
        }

        return sender
            .then(response => {
                if (response.statusCode !== 200) {
                    let res = JSON.parse(response.body);

                    return Promise.reject(new ApiError({
                        code    : res.code,
                        message : res.message,
                        status  : response.statusCode
                    }));
                }
                return Promise.resolve(SendRequest._parseBody(response));
            });
    }

    static _parseBody(res) {
        if (res.body) res.body = JSON.parse(res.body);
        return res;
    }
}

module.exports = SendRequest;