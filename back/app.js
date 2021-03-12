const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const csp = require('helmet-csp');
const csurf = require('csurf');

let app = express();

const apiRoute = '/api/v1/';
let cityRouter = require('./routes/city.router');
let stateRouter = require('./routes/state.router');
let dbConnect = require('./config/db.config');

dbConnect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
//app.use(csurf());
app.use(cors());
app.use(compression());

app.use(csp({
  directives: {
    defaultSrc: ["'self'", 'http:'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    sandbox: ['allow-forms', 'allow-scripts'],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false 
  }
}))

app.use(apiRoute, cityRouter);
app.use(apiRoute, stateRouter);

module.exports = app;
