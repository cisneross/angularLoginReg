var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session'); 
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(session({
    secret: 'keyboardkitteh',
    resave:false,
    saveUninitialized: true,
    cookie:{maxAge:60000}
}));
mongoose.connect('mongodb://localhost/spot_db', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function(){
    console.log('on port 8000');
})