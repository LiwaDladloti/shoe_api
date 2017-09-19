var express = require('express');
var body_parser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var app = express();

app.use(express.static('public'));
app.use(body_parser.urlencoded({extended: false}), body_parser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(8082, function(){
    console.log('app running on port 8082')
});

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/shoe_api";
mongoose.connect(mongoURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('We are connected');
});

var shoes = mongoose.Schema({
    id: String,
    brand: String,
    color: String,
    size: Number
});

var shoeModel = mongoose.model('shoeApi', shoes);

app.get('/api/shoes', function(req, res){
        var newShoe = new shoeModel({
                id: 99,
                brand: "Nike",
                color: "Blue",
                size: 6
        });
        newShoe.save();
    shoeModel.find({}, function(err, results){
        if(err){
            console.log(err);
        } else {
            res.json(results);
        }
    });
});