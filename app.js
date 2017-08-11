var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;



var customers = [];
var customerNextId = 1;

var salers = [];
var salerNextId = 1;

app.use(bodyParser.json());


//GET gara
app.get('/', function(req, res){
    res.send('Welcome to our gara!');
});

app.post('/customer', function(req, res){
    var body= _.pick(req.body,  'customer_name', 'customer_address', 'customer_phone');

    db.customer.create(body).then(function(customer){
        res.json(customer.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})


app.post('/saler', function(req, res){
    var body= _.pick(req.body, 'saler_name', 'saler_address', 'saler_phone');

    db.saler.create(body).then(function(saler){
        res.json(saler.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})


app.post('/menufacturer', function(req, res){
    var body= _.pick(req.body, 'menufacturer_name');

    db.menufacturer.create(body).then(function(menufacturer){
        res.json(menufacturer.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

app.post('/options', function(req, res){
    var body= _.pick(req.body, 'part_name', 'quanity', 'amount_sale');

    db.options.create(body).then(function(options){
        res.json(options.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

app.post('/invoice', function(req, res){
    var body= _.pick(req.body,  'price_sold', 'customerId', 'salerId', 'is_tradein', 'menufacturerId', 'vehicleId');

    db.invoice.create(body).then(function(invoice){
        res.json(invoice.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

app.post('/invoice_options', function(req, res){
    var body= _.pick(req.body, 'invoiceId', 'optionId');

    db.invoice_options.create(body).then(function(invoice_options){
        res.json(invoice_options.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

app.post('/vehicles', function(req, res){
    var body= _.pick(req.body, 'vehicle_name', 'model', 'seria_number', 'year', 'cost', 'amount_sale');

    db.vehicles.create(body).then(function(vehicles){
        res.json(vehicles.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

//GET
app.get('/customer', function(req, res){
    var query = req.query;

    db.customer.findAll().then(function(customer){
        res.json(customer);
    }, function(e){
        res.status(500).send();
    });
});

app.get('/saler', function(req, res){
    var query = req.query;

    db.saler.findAll().then(function(saler){
        res.json(saler);
    }, function(e){
        res.status(500).send();
    });
});




db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log('Express listening on port ' + PORT + '!');
    });
})