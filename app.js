const express = require('express');
const hbs = require('hbs');
const homeRouter = require('./routes/home');
const request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

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
app.use(cors());
app.use(cookieParser());
hbs.registerPartials(__dirname + '/views/partials/');

// use router
app.use('/', homeRouter);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).send('<h1>what??? page not found! 404</h1>');

});


app.listen(8888, function (req, res) {
    console.log("Server ready at 8888");
});