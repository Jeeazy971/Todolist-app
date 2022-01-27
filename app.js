//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname));

let items = [];

app.get('/', (req, res) => {
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let day = today.toLocaleDateString('fr-FR', options);

    res.render('list', { kindOfDay: day, todoItem: items });
});

app.post('/', (req, res) => {
    let item = req.body.item;

    items.push(item);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Demarrage du serveur sur le port:3000');
});
