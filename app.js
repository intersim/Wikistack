var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');

var app = express();

app.use(morgan('tiny', 'stream'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn off swig's caching
swig.setDefaults({cache: false});

app.get('/', function (req, res, next) {
  res.render('index', { hello: 'hello world'});
})

app.listen(3030, function () {
  console.log("the server is listening...");
});