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
    authenticate,
    register,
    getStats,
    refreshToken,
    revokeToken,
    getRefreshTokens
};

async function authenticate(email, password, ipAddress)
{
    var client = new CODclient();
    await client.initialize();
    await client.login(email, password);

    var user = await db.User.findOne({"email": email});
    if (!user)
        throw new ErrorHandler(USER_NOT_FOUND);
    var credentials = await client.getCredentials();
    user.sso = credentials.sso;
    user.aktn = credentials.aktn;
    user.pgacct = credentials.pgacct;
    await user.save();
    const access_token = generateJwtToken(user);
    const refresh_token = generateRefreshToken(user, ipAddress);
    await refresh_token.save();
    return { 
        ...basicDetails(user),
        access_token,
        refresh_token
    }
}

async function register(email, password, ipAddress)
{
    var client = new CODclient();
    await client.initialize();
    await client.login(email, password);
    var identities = await client.getIdentities();



    var credentials = await client.getCredentials();

    var user = await db.User.findOne({"email": email});
    if (user)
        throw new ErrorHandler(USER_ALREADY_EXIST);
    user = new db.User;
    user.email = email;
    user.role = "user";
    user.sso = credentials.sso;
    user.aktn = credentials.aktn;
    user.pgacct = credentials.pgacct;

    for (var i of identities.titleIdentities) {
        if (i.title == "cw")
            user.cw_username = i.username
        if (i.title == "mw")
            user.wz_username = i.username
    }


    await user.save();
    const access_token = generateJwtToken(user);
    const refresh_token = generateRefreshToken(user, ipAddress);
    await refresh_token.save();
    return { 
        ...basicDetails(user),
        access_token,
        refresh_token
    }
}

async function getStats(user_id)
{
    var user = await db.User.findById(user_id);

    if (!user)
        throw new ErrorHandler(...USER_NOT_FOUND);
    var client = new CODclient();
    await client.initialize();
    client.setCredentials(user.sso.value, user.sso.expiry, user.sso.remember_me, user.aktn, user.pgacct)
    console.log(await client.getFriends());
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
    const { id, email, role} = user;
    return { id, email, role};
}
