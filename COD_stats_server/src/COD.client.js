const axios = require('axios');
var HTMLParser = require('node-html-parser');

class CODclient {
    static GAMES = {
        COLD_WAR: "cw",
        MODERN_WARFARE: "mw"
    }
    static MODES = {
        MULTIPLAYER: "mp",
        WARZONE: "wz"
    }
    constructor() {
        this.sso_cookie = null;
        this.sso_expiry = null;
        this.sso_remember_me = null;
        this.aktn = null;
        this.xsrf_token = null;
        this.pgacct = null;
    }
    _error_handler(response) {
        switch (response.status) {
            case 200:
                return "Oups something strange happened."
            case 401:
                return "401 - Unauthorized."
            case 403:
                return "403 - Forbidden."
            case 500:
                return "500 - internal server error."
            case 502:
                return "502 - Bad gateway."
            default:
                return `${response.status} - Oups something strange happened.`
        }
    }
    _buildHeader()
    {
        var header = {
            headers: {'Cookie': `ACT_SSO_COOKIE=${this.sso_cookie}; ACT_SSO_COOKIE_EXPIRY=${this.sso_expiry}; atkn=${this.aktn};` },
            maxRedirects: 0
        }
        return header;
    }
    initialize() {
        return new Promise(((resolve, reject) => {
            axios.get('https://profile.callofduty.com/cod/login')
            .then((response) => {
                var token;

                for (var i in response.headers['set-cookie']) {
                    if (response.headers['set-cookie'][i].startsWith("XSRF-TOKEN"))
                        token = response.headers['set-cookie'][i]
                }
                var re = /([^;]+);?(\w?)=([^;]*)/g
                token = token.split(re)[3]
                this.xsrf_token = token;
                resolve();
            })
            .catch((e)=> {
                reject(this._error_handler(e.response));
            })
        }))
    }
    login(email, password) {
        return new Promise(((resolve, reject) => {
            var url = new URLSearchParams();
            url.append("username", email);
            url.append("password", password);
            url.append("remember_me", true);
            url.append("_csrf", this.xsrf_token);
            var config = {
                headers: {'Cookie': "XSRF-TOKEN= " + this.xsrf_token + "; new_SiteId=cod"},
                maxRedirects: 0
            }
            axios.post('https://profile.callofduty.com/do_login?new_SiteId=cod', url, config)
            .then((response) => {
                //
                //  normal behavior COD api is shitty asf
                //
                reject(this._error_handler(response));
            })
            .catch((e)=> {
                for (var i in e.response.headers['set-cookie']) {
                    var re = /([^;]+);?(\w?)=([^;]*)/g
                    var tmp = e.response.headers['set-cookie'][i].split(re);
                    var name = tmp[1];
                    var value = tmp[3];
                    switch (name) {
                        case "XSRF-TOKEN":
                            this.xsrf_token = value;
                            break;
                        case "ACT_SSO_COOKIE_EXPIRY":
                            this.sso_expiry = value;
                                break;
                        case "ACT_SSO_COOKIE":
                            this.sso_cookie = value;
                            break;
                        case "ACT_SSO_REMEMBER_ME":
                            this.sso_remember_me = value;
                            break;
                        case "atkn":
                            this.aktn = value;
                            break;
                        case "pgacct":
                            this.pgacct = value;
                            break;
                    }
                }
                resolve();
            })
        }))
    }
    getIdentities()
    {
        return new Promise(((resolve, reject) => {
            axios.get(`https://www.callofduty.com/api/papi-client/crm/cod/v2/identities/${this.sso_cookie}`, this._buildHeader())
            .then((response) => {
                resolve(response.data.data);
            })
            .catch((e)=> {
                reject(this._error_handler(e.response));
            })
        }))
    }
    getPreferences()
    {
        return new Promise(((resolve, reject) => {
            axios.get('https://profile.callofduty.com/cod/prefs', this._buildHeader())
            .then((response) => {
                var res = HTMLParser.parse(response.data)
                resolve(res);
            })
            .catch((e)=> {
                reject(this._error_handler(e.response));
            })
        }))
    }
    getFriends()
    {
        return new Promise(((resolve, reject) => {
            axios.get(`https://my.callofduty.com/api/papi-client/userfeed/v1/friendFeed/rendered/fr/${this.sso_cookie}`, this._buildHeader())
            .then((response) => {
                resolve(response.data.data.identities);
            })
            .catch((e)=> {
                reject(this._error_handler(e.response));
            })
        }))
    }
    getRecentMatches(username, game = CODclient.GAMES.MODERN_WARFARE, mode = CODclient.MODES.MULTIPLAYER) // mode: mp / wz  game: cw / mw
    {
        return new Promise(((resolve, reject) => {
            axios.get(`https://my.callofduty.com/api/papi-client/crm/cod/v2/title/${game}/platform/${this.pgacct}/gamer/${username}/matches/${mode}/start/0/end/0/details`, this._buildHeader())
            .then((response) => {
                resolve(response.data.data);
            })
            .catch((e)=> {
                reject(this._error_handler(e.response));
            })
        }))
    }
    getStatistics(username, game = CODclient.GAMES.MODERN_WARFARE, mode = CODclient.MODES.MULTIPLAYER)
    {
        return new Promise(((resolve, reject) => {
            axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/${game}/platform/${this.pgacct}/gamer/${username}/profile/type/${mode}`, this._buildHeader())
            .then((response) => {
                resolve(response.data.data);
            })
            .catch((e)=> {
                reject(this._error_handler(e.response));
            })
        }))
    }
    getWeapon(username, game = CODclient.GAMES.MODERN_WARFARE, mode = CODclient.MODES.MULTIPLAYER)
    {
        return new Promise(((resolve, reject) => {
            axios.get(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/${game}/platform/${this.pgacct}/gamer/${username}/profile/type/${mode}`, this._buildHeader())
            .then((response) => {
                console.log(response.data.data);
                resolve(response.data.data.lifetime.itemData);
            })
            .catch((e)=> {
                reject(this._error_handler(e.response));
            })
        }))
    }

    getCredentials()
    {
        return {
            sso: {
                value: this.sso_cookie,
                expiry: this.sso_expiry,
                remember_me: this.sso_remember_me
            },
            aktn: this.aktn,
            xsrf_token: this.xsrf_token,
            pgacct: this.pgacct 
        }
    }
    setCredentials(sso_cookie, sso_expiry, sso_remember_me, aktn, pgacct)
    {
        this.sso_cookie = sso_cookie;
        this.sso_expiry = sso_expiry;
        this.sso_remember_me = sso_remember_me;
        this.aktn = aktn;
        this.pgacct = pgacct;
    }
}

module.exports = CODclient;