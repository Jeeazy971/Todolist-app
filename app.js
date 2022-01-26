//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(3000, () => {
    console.log('Demarrage du serveur sur le port:3000');
});
