const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const db = require('../../helpers/db');
const role = require('../../helpers/role');

const axios = require('axios')

const { ErrorHandler } = require('../../helpers/error');
const { USER_NOT_FOUND, INVALID_CREDENTIALS, USER_ALREADY_EXIST, UNAUTHORIZED, INVALID_AUTH_CODE } = require('../../helpers/error-type');

var CODclient = require('../../COD.client');

module.exports = {
    getCWmatches,
    getWZmatches,
    getCWstats,
    getWZstats,
    getCWweapon,
    getWZweapon
};

async function getCWmatches(user_id)
{
    var user = await db.User.findById(user_id);
    if (!user)
        throw new ErrorHandler(...USER_NOT_FOUND);
    var client = new CODclient();
    await client.initialize();
    client.setCredentials(user.sso.value, user.sso.expiry, user.sso.remember_me, user.aktn, user.pgacct);

    var matches = await client.getRecentMatches(user.cw_username, CODclient.GAMES.COLD_WAR, CODclient.MODES.MULTIPLAYER);
    //console.log(matches);
    return matches;
}

async function getWZmatches(user_id)
{
    var user = await db.User.findById(user_id);
    if (!user)
        throw new ErrorHandler(...USER_NOT_FOUND);
    var client = new CODclient();
    await client.initialize();
    client.setCredentials(user.sso.value, user.sso.expiry, user.sso.remember_me, user.aktn, user.pgacct);

    var matches = await client.getRecentMatches(user.wz_username, CODclient.GAMES.MODERN_WARFARE, CODclient.MODES.WARZONE);
    //console.log(matches);
    return matches;
}

async function getCWstats(user_id)
{
    var user = await db.User.findById(user_id);
    if (!user)
        throw new ErrorHandler(...USER_NOT_FOUND);
    var client = new CODclient();
    await client.initialize();
    client.setCredentials(user.sso.value, user.sso.expiry, user.sso.remember_me, user.aktn, user.pgacct);

    var stats = await client.getStatistics(user.cw_username, CODclient.GAMES.COLD_WAR, CODclient.MODES.MULTIPLAYER);

    return stats;
}

async function getWZstats(user_id)
{
    var user = await db.User.findById(user_id);
    if (!user)
        throw new ErrorHandler(...USER_NOT_FOUND);
    var client = new CODclient();
    await client.initialize();
    client.setCredentials(user.sso.value, user.sso.expiry, user.sso.remember_me, user.aktn, user.pgacct);
    var stats = await client.getStatistics(user.wz_username, CODclient.GAMES.MODERN_WARFARE, CODclient.MODES.WARZONE);

    return stats;
}

async function getCWweapon(user_id)
{
    var user = await db.User.findById(user_id);
    if (!user)
        throw new ErrorHandler(...USER_NOT_FOUND);
    var client = new CODclient();
    await client.initialize();
    client.setCredentials(user.sso.value, user.sso.expiry, user.sso.remember_me, user.aktn, user.pgacct);

    var weapon = await client.getWeapon(user.cw_username, CODclient.GAMES.COLD_WAR, CODclient.MODES.MULTIPLAYER);
    return (weapon);
}

async function getWZweapon(user_id)
{
    var user = await db.User.findById(user_id);
    if (!user)
        throw new ErrorHandler(...USER_NOT_FOUND);
    var client = new CODclient();
    await client.initialize();
    client.setCredentials(user.sso.value, user.sso.expiry, user.sso.remember_me, user.aktn, user.pgacct);

    var weapon = await client.getWeapon(user.wz_username, CODclient.GAMES.MODERN_WARFARE, CODclient.MODES.WARZONE);
    return (weapon);
}
function basicDetails(user) {
    const { id, email, role} = user;
    return { id, email, role};
}
