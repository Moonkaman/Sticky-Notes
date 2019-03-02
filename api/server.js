const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const configureMiddleware = require('./middleware');
const authRouter = require('../auth/authRouter');
const boardsRouter = require('../boards/boardsRouter');

const server = express();

configureMiddleware(server);
server.use('/api/auth', authRouter);
server.use('/api/boards', boardsRouter);

module.exports = server;