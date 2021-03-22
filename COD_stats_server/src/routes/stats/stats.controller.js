const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const validateRequest = require('../../middleware/validate-request');
const authorize = require('../../middleware/authorize');
const stats = require('./stats.service');

router.get("/cw/matches", authorize(), cw_matches);
router.get("/wz/matches", authorize(), wz_matches);
router.get("/cw", authorize(), cw_stats);
router.get("/wz", authorize(), wz_stats);
router.get("/cw/weapon", authorize(), cw_weapon);
router.get("/wz/weapon", authorize(), wz_weapon);


module.exports = router;

function cw_matches(req, res, next) {
    stats.getCWmatches(req.user.id)
        .then((data) => {
            res.status(200).json({data: data});
        })
        .catch(next);
}

function wz_matches(req, res, next) {
    stats.getWZmatches(req.user.id)
        .then((data) => {
            res.status(200).json({data: data});
        })
        .catch(next);
}

function cw_stats(req, res, next) {
    stats.getCWstats(req.user.id)
        .then((data) => {
            res.status(200).json({data: data});
        })
        .catch(next);
}

function wz_stats(req, res, next) {
    stats.getWZstats(req.user.id)
        .then((data) => {
            res.status(200).json({data: data});
        })
        .catch(next);
}

function cw_weapon(req, res, next) {
    stats.getCWweapon(req.user.id)
        .then((data) => {
            res.status(200).json({data: data});
        })
        .catch(next);
}

function wz_weapon(req, res, next) {
    stats.getWZweapon(req.user.id)
        .then((data) => {
            res.status(200).json({data: data});
        })
        .catch(next);
}