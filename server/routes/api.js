const express      = require('express');
const router       = express.Router();
const api          = require('server/lib/api');
const config       = require('config');

const logger       = require('server/lib/log').loggers.get('error_loging');
const signRequest  = require('server/middleware/sign_request');

// router.get('/test', signRequest.signRequest(), (req, res, next) => {
//     return api.test(req)
//         .then(response => res.send(response.body))
//         .catch(err => next(err)) });
//
// router.post('/test', signRequest.signRequest(), (req, res, next) => {
//     return api.test(req, req.body)
//         .then(response => res.send(response.body))
//         .catch(err => next(err))
// });

router.use((err, req, res, next) => {

    logger.error(`\n${err} + ${err.stack}\n`);

    return res.status(err.status ? err.status : 500).send(err);

});

module.exports = router;