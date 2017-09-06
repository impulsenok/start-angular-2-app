const country      = process.env.NODE_COUNTRY || 'tg';
const express      = require('express');
const router       = express.Router();
const api          = require('server/lib/api');
const config       = require('config');

const signRequest  = require('server/middleware/sign_request');

router.get('/get_session_data', (req, res, next) => {

    let result = {};

    if (req.session && req.session.user && req.session.user.authorized) {

        result = {
            user: {
                authorized: true
            }
        }
    } else {

        result = {
            user: {

            }
        }
    }

    return res.send(result);
});

router.post('/destroy_session', signRequest.signRequest(true), (req, res, next) => {

    if (req.session && req.session.user && req.session.user.authorized) {

        req.session.user = null;
        req.session.token = null;

        // return api.logout(req)
        //     .then(() => res.send({status: "success"}))
        //     .catch((err) => next(err));
    }

    return res.send({status: "success"});
});

module.exports = router;