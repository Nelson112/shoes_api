var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var models = require('./models')
var ObjectId = require("mongodb").ObjectId

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get("/", function(req, res) {
  res.render('index', {})
})
app.post('/api/shoes', function(req, res) {
  var shoeData = req.body
  var in_Stock = shoeData.in_Stock;
  var brand = shoeData.brand;
  var color = shoeData.color;
  var size = shoeData.size;
  var price = shoeData.price;
  models.storedshoes.findOneAndUpdate({
      brand: brand,
      color: color,
      size: size,
      price: price
    }, {
      $inc: {
        in_Stock: in_Stock
      }
    },
    function(err, shoes) {
  res.send(shoes)
      if (err) {
        return err
      } else if (!shoes) {
        models.storedshoes.create({
          brand: shoeData.brand,
          color: shoeData.color,
          size: shoeData.size,
          in_Stock: shoeData.in_Stock,
          price: shoeData.price
        }, function(err, results) {
          if (err) {
            return err
          } else {
            res.send(results)
          }
        });
      }
    })
});
app.get('/api/shoes', function(req, res) {
  models.storedshoes.find({},
    function(err, allShoes) {
      // console.log(allShoes);
      if (err) {
        return err
      } else {
        res.json(allShoes)
      }
    })
})
app.get('/api/shoes/brand/:brandname', function(req, res) {
  var brand = req.params.brandname
  models.storedshoes.find({
      "brand": {
        $regex: brand,
        $options: "i"
      }
    },
    function(err, brand) {
      console.log(brand);
      if (err) {
        return err
      } else {
        res.json(brand)
      }
    })
})
app.get('/api/shoes/size/:size', function(req, res) {
  var size = req.params.size
  models.storedshoes.find({
      size: size
    },
    function(err, size) {
      console.log(size);
      if (err) {
        return err
      } else {
        res.json(size)
      }
    })
})
app.get('/api/shoes/brand/:brandname/size/:size', function(req, res) {
  var size = req.params.size
  var brand = req.params.brandname
  models.storedshoes.find({
      size: size,
      brand: brand
    },
    function(err, shoes) {
      console.log(shoes);
      if (err) {
        return err
      } else {
        res.json(shoes)
      }
    })
})
app.post('/api/shoes/sold/:id', function(req, res) {
  var id = req.params.id
  models.storedshoes.findOneAndUpdate({
    _id: ObjectId(id)
  }, {
    $inc: {
      "in_Stock": -1
    },
  }, {
    upsert: false
  }, function(err, shoe) {
    // console.log(shoe.in_Stock);
    if (err) {
      return err
    } else if (shoe.in_Stock < 2) {
      shoe.remove()
      res.send('Out of stock!!')
    } else {
      res.json(shoe)
    }
  })
})

var port = process.env.PORT || 3009

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port);
