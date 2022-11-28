const express = require('express');
const path = require('path');
const libgen = require('libgen');


const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/icons'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

let pagePath = '/pages/index.html';

app.get('/', async (req, res) => {
    res.render('index');
    console.log('listening');
})

app.post('/bookSearch', async (req, res) => {
    try {
        const options = {
            mirror: 'http://libgen.is',
            query: req.body.search,
            count: 45
        }
        const a = await libgen.search(options);
        res.render('results', {a});
    } catch (error) {
        console.log(error);
    }
})

// app.get('/results', (req, res) => {
//     res.sendFile(__dirname + '/pages/results.html');

// })

app.listen(3000);