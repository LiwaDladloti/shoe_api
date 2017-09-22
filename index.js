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
//    id : Number,
    color : String,
    brand : String,
    price : Number,
    size : Number,
    in_stock : Number
});

var shoeModel = mongoose.model('shoeApi', shoes);

app.post('/api/shoes', function(req, res){
    var storeShoes = req.body
    
        shoeModel.create({
            color: storeShoes.color,
            brand: storeShoes.brand,
            price: storeShoes.price,
            size: storeShoes.size,
            in_stock: storeShoes.in_stock
        },
            
        function(err, results){
            if(err){
            return err
        } else {
                res.send(results)
            }
        })
});

app.get('/api/shoes', function(req, res){
        shoeModel.find({}, function(err, results){
        if(err){
            console.log(err);
        } else {
            res.json(results);
        }
    })
});

app.get('/api/shoes/brand/:brandname', function(req, res){
    var brandname = req.params.brandname;
    shoeModel.find({
        brand: brandname
    }, function(err, result){
        if(err){
            console.log(err)
        } else {
            res.json({result})
        }
    })
});

app.get('/api/shoes/size/:size', function(req, res){
    var size = req.params.size;
    shoeModel.find({
        size: size
    }, function(err, result){
        if(err){
            console.log(err)
        } else {
            res.json({result})
        }
    })
});

app.get('/api/shoes/brand/:brandname/size/:size', function(req, res){
    var brandname = req.params.brandname;
    var size = req.params.size;
    shoeModel.find({
        brand: brandname,
        size: size
    }, function(err, result){
        if (err){
            console.log(err)
        } else {
            res.json(result)
        }
    })
});