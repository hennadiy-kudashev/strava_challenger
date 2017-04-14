const express = require('express');
const compression = require('compression');
const route = require('./src/server/route.js');

const app = express();

app.use(compression());
app.use('/dist', express.static('dist'));

route(app);
