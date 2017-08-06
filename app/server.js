const path = require('path');
const express = require('express');
const app = express();

const index = require('./routes/index');
const api = require('./routes/api');

// routes
app.use('/', index);
app.use('/api', api);

// views
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, 'views')));

app.listen(8080, () => {
    console.log('Application listening on port 8080!')
});
