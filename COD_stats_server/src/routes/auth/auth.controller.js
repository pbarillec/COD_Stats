const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validateRequest = require('../../middleware/validate-request');
const authorize = require('../../middleware/authorize');
const auth = require('./auth.service');


router.post("/signin", signinSchema, signin);
router.post("/signup", signupSchema, signup);
router.post("/refresh-token", refreshToken);

module.exports = router;

function signupSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function signinSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function signin(req, res, next) {
    const {token} = req.body;
    const ipAddress = req.ip;
    auth.authenticate(token, ipAddress)
    .then(({ refresh_token, access_token, ...user}) => {
        setTokenCookie(res, refresh_token);
        res.json({ user, access_token: access_token });
    })
    .catch(next);
}

function signup(req, res, next) {
    const {token} = req.body;
    const ipAddress = req.ip;
    auth.authenticate(token, ipAddress)
        .then(({ refresh_token, access_token, ...user}) => {
            setTokenCookie(res, refresh_token);
            res.json({user, access_token: access_token});
        })
        .catch(next);
}

function refreshToken(req, res, next) {
    const token = req.cookies.refresh_token;
    const ipAddress = req.ip;
    localService.refreshToken(token, ipAddress)
    .then(({ refresh_token, access_token}) => {
        setTokenCookie(res, refresh_token);
        res.json({access_token: access_token});
    })
    .catch(next);
}

function setTokenCookie(res, token)
{
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refresh_token', token, cookieOptions);
}