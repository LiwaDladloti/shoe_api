var express = require('express');
var body_parser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var app = express();

app.use(express.static('public'));
app.use(body_parser.urlencoded({extended: false}), body_parser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
  next();
})

app.listen(process.env.PORT || 8082, function(){
    console.log('app running on port 8082')
});

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/shoe_api";
mongoose.connect(mongoURL, {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('We are connected');
});

var shoes = mongoose.Schema({
    color : String,
    brand : String,
    price : Number,
    size : Number,
    in_stock : Number
});

var shoeModel = mongoose.model('shoeApi', shoes);

//app.get('/', function(req, res){
//    res.render('shoe')
//})

app.post('/api/shoes', function(req, res){
    var storeShoes = req.body
    
    shoeModel.findOneAndUpdate({
        color: storeShoes.color,
        brand: storeShoes.brand,
        price: storeShoes.price,
        size: storeShoes.size
    }, {
        $inc: {
            in_stock: storeShoes.in_stock
        }
    }, function(err, results){
        if(err){
        return err
    } else if (!results){
        shoeModel.create({
            color: storeShoes.color,
            brand: storeShoes.brand,
            price: storeShoes.price,
            size: storeShoes.size,
            in_stock: storeShoes.in_stock
        }, function(err, shoeResults){
        if(err){
        return err
        }
            res.json({shoeResults})
        })
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

app.get('/api/shoes/colour/:colour', function(req, res){
    var colour = req.params.colour;
    shoeModel.find({
        color: colour
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
    }, function(err, sizeResult){
        if(err){
            console.log(err)
        } else {
            res.json({sizeResult})
        }
    })
});

app.get('/api/shoes/colour/:colour/brand/:brandname', function(req, res){
    var colour = req.params.colour;
    var brandname = req.params.brandname;
    shoeModel.find({
        color: colour,
        brand: brandname
    }, function(err, result){
        if(err){
            console.log(err)
        } else {
            res.json({result})
        }
    })
});

app.get('/api/shoes/colour/:colour/size/:size', function(req, res){
    var colour = req.params.colour;
    var size = req.params.size;
    shoeModel.find({
        color: colour,
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
            res.json({result})
        }
    })
});

app.get('/api/shoes/brand/:brandname/size/:size/colour/:colour', function(req, res){
    var brandname = req.params.brandname;
    var size = req.params.size;
    var colour = req.params.colour
    shoeModel.find({
        brand: brandname,
        size: size,
        color: colour
    }, function(err, result){
        if (err){
            console.log(err)
        } else {
            res.json({result})
        }
    })
});

app.post('/api/shoes/sold/:id', function(req, res){
    var id = req.params.id;
    shoeModel.findOneAndUpdate({
        _id: ObjectId(id)
    },
    {
        $inc: {in_stock: - 1}
    },
    {
        upsert: false
    }, function(err, result){
        if(err){
            console.log(err)
        } if(result.in_stock <= 0){
            result.remove()
            res.json({result})
        }
    })
});