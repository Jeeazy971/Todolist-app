//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = ['Ardoise', 'Cartable', 'Stylo'];
let workItems = [];

app.get('/', (req, res) => {
    const day = date.getDate();
    res.render('list', { listTitle: day, todoItem: items });
});

app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Liste de travail', todoItem: workItems });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/', (req, res) => {
    const item = req.body.item;

    items.push(item);
    res.redirect('/');
});

app.post('/work', (req, res) => {
    const item = req.body.item;

    if (req.body.list === 'work') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('*', (req, res) => {
    res.render('404');
});

app.post('/404', (req, res) => {
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Demarrage du serveur sur le port:3000');
});
