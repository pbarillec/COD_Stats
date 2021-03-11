require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
var session = require('express-session');


// create test user in db on startup if required
//const createTestUser = require('helpers/create-test-user');
//createTestUser();
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(morgan(':method :status :res - :response-time ms'));

morgan.token('id', function getId(req) {
    return req.id;
});

app.use(morgan('[:date[web]] :method :url :status :response-time ms'));

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// require("./config/passport");

app.use('/', (req, res) => {
    res.status(200).json("cc");
})

// start server
const port = 8080//process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});