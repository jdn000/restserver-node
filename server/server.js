require('./config/config');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//habilitar index
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;
    console.log('Base de datos arriba');

});
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));