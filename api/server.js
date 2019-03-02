const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const configureMiddleware = require('./middleware');
const authRouter = require('../auth/authRouter');

const server = express();

configureMiddleware(server);
server.use('/api/auth', authRouter);

module.exports = server;