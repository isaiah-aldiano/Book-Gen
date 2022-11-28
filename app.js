const express = require('express');
const path = require('path');
const libgen = require('libgen');
const app = express();

//Static load css and images 
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/icons'));
app.use(express.urlencoded({extended: true}));

//Sets ejs as templating engine
app.set('view engine', 'ejs');

//Get request for index page
app.get('/', async (req, res) => {
    res.render('index');
    console.log('listening');
})

//Post request to display data from libgen api
//incase page loads infinitely change out mirror with one of these
// http://gen.lib.rus.ec
// http://libgen.rocks
// http://libgen.lol
// http://libgen.ee
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

//opens port 3000 for get requests
app.listen(3000);