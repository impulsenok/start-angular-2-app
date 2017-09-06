const country      = process.env.NODE_COUNTRY || 'tg';
const express      = require('express');
const router       = express.Router();
const api          = require('server/lib/api');
const config       = require('config');

const signRequest  = require('server/middleware/sign_request');
const signGenerate = require('server/lib/sign_generate');

router.post('/', signRequest.signRequest(), (req, res, next) => {});

router.post('/logout', signRequest.signRequest(true), (req, res, next) => {

    req.session.user = null;
    req.session.token = null;

    // return api.logout(req)
    //     .then(() => res.send({status: "success"}))
    //     .catch((err) => next(err));
});

router.use((err, req, res, next) => {

    if(err.status == 498 || err == 'UNAUTHORIZED') {
        req.session.user = undefined;
        req.session.token = undefined;
    }

    if (err == 'UNAUTHORIZED') {
        return res.status(401).send('UNAUTHORIZED');
    } else {
        return res.status(err.status ? err.status : 500).send(err);
    }
});

module.exports = router;