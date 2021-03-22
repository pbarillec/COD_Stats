const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const db = require('../../helpers/db');
const role = require('../../helpers/role');

const axios = require('axios')

const { ErrorHandler } = require('../../helpers/error');
const { USER_NOT_FOUND, INVALID_CREDENTIALS, USER_ALREADY_EXIST, UNAUTHORIZED, INVALID_AUTH_CODE } = require('../../helpers/error-type');

var CODclient = require('../../COD.client')

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    getRefreshTokens
};

async function authenticate(token, ipAddress)
{
    var client = new CODclient();
    await client.initialize();
    await client.login("email", "password");



    var identities = await client.getIdentities();
    
    var friends = await client.getFriends();

    var recent_matches = await client.getRecentMatches("Bygius", CODclient.GAMES.COLD_WAR, CODclient.MODES.MULTIPLAYER);
    var statistics = await client.getStatistics("Bygius", CODclient.GAMES.COLD_WAR, CODclient.MODES.MULTIPLAYER);
    
    //console.log(recent_matches);
    //console.log(statistics);
    //console.log(identities);
    return null;
}

async function refreshToken(token, ipAddress) {

    if (!token)
        throw new ErrorHandler(...UNAUTHORIZED)
    const refreshToken = await getRefreshToken(token);
    if (!refreshToken)
        throw new ErrorHandler(...UNAUTHORIZED)
    const { user } = refreshToken;

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();
    // generate new jwt
    const access_token = generateJwtToken(user);
    // return basic details and tokens
    return { 
        access_token,
        refresh_token: newRefreshToken
    };
}

async function revokeToken(token, ipAddress) {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function getRefreshTokens(userId) {    
    try {
        await getUser(userId);
    } catch {
        throw new ErrorHandler(...UNAUTHORIZED);
    }
    // return refresh tokens for user
    const refresh_tokens = await db.RefreshToken.find({ user: userId });
    return refresh_tokens;
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne( {'token': token.token }).populate('user');

    if (!refreshToken || !refreshToken.isActive) {
        throw new ErrorHandler(...UNAUTHORIZED);
    }
    return refreshToken;
}

function generateJwtToken(user) {
    // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '50m' });
}

function generateRefreshToken(user, ipAddress) {
    // create a refresh token that expires in 7 days
    return new db.RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(user) {
    const { id, battle_net} = user;
    const { battletag } = battle_net;
    return { id, battletag};
}
