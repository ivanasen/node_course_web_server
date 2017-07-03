const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let inMaintenance = true;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log.');
        }
    });
    next();
});

app.use((req, res, next) => {
    if (inMaintenance) {
        res.render('maintenence.hbs');
    } else {
        next();
    }
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    // res.send('<h1>Hello express!</h1>');
    // res.send({
    //     name: 'Ivan-Asen',
    //     likes: [
    //         'Drawing',
    //         'Sports'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home page',
        greetMessage: 'loremclsdhfoierpygferhgurieghruieger;g'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});