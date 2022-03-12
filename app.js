//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Connection a la BDD
mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemSchema = {
    name: 'String',
};

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
    name: 'Bienvenue dans votre todolist !',
});

const item2 = new Item({
    name: 'Appuyez sur le bouton + pour ajouter un élément.',
});
const item3 = new Item({
    name: "⬅ Pour supprimer l'element.",
});

const defaultItem = [item1, item2, item3];

app.get('/', (req, res) => {
    Item.find({}, (err, items) => {
        if (items.length === 0) {
            Item.insertMany(defaultItem, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Objet par defaut sauvegardé.');
                }
            });
            res.redirect('/');
        } else {
            res.render('list', { listTitle: 'Today', todoItem: items });
        }
    });
});

app.get('/maison', (req, res) => {
    res.send('<h1>Maison !</h1>');
});

app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Liste de travail', todoItem: workItems });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.post('/', (req, res) => {
    const itemName = req.body.item;

    const item = new Item({
        name: itemName,
    });

    item.save();

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

app.post('/delete', (req, res) => {
    const delItemName = req.body.checkbox;

    Item.findByIdAndRemove(delItemName, (err) => {
        if (!err) {
            console.log('Supprimé');
            res.redirect('/');
        }
    });
});

app.get('*', (req, res) => {
    res.render('404');
});

app.post('/404', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Demarrage du serveur sur le port:3000');
});
