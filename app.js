const express = require('express');
const hbs = require('hbs');
const homeRouter = require('./routes/home');
const request = require('request');

app = express();

//const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: false
}));

// hbs middleware
app.set('view engine', 'hbs');

// static folder middleware
app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials/');

// use router
app.use('/', homeRouter);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).send('<h1>what??? page not found! 404</h1>');

});


app.listen(3000, function (req, res) {
    console.log("listening at 3000");
});