var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var path = require('path');

// var vehicles = require('./routes/vehicle'); 
var app = express();
var PORT = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

var customer = [];
var customerNextId = 1;

var salesman = [];
var salesmanNextId = 1;
var vehicle = [];
var vehicleNextId = 1;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



app.post('/customer', function(req, res){
    var body= _.pick(req.body,  'customer_name', 'customer_address', 'customer_phone');

    db.customer.create(body).then(function(customer){
        res.json(customer.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})


app.post('/salesman', function(req, res){
    var body= _.pick(req.body, 'salesman_name', 'salesman_address', 'salesman_phone');

    db.salesman.create(body).then(function(salesman){
        res.json(salesman.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})


app.post('/manufacturer', function(req, res){
    var body= _.pick(req.body, 'manufacturer_name');

    db.manufacturer.create(body).then(function(manufacturer){
        res.json(manufacturer.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

app.post('/option', function(req, res){
    var body= _.pick(req.body, 'part_name', 'quanity', 'amount_sale');

    db.option.create(body).then(function(option){
        res.json(option.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

app.post('/invoice', function(req, res){
    var body= _.pick(req.body,  'price_sold', 'customerId', 'salesmanId', 'is_tradein', 'menufacturerId', 'vehicleId');

    db.invoice.create(body).then(function(invoice){
        res.json(invoice.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

app.post('/invoice_option', function(req, res){
    var body= _.pick(req.body, 'invoiceId', 'optionId');

    db.invoice_option.create(body).then(function(invoice_option){
        res.json(invoice_option.toJSON());
    }, function(e){
        res.status(400).json(e);
    });
})

app.post('/vehicle/add', function(req, res){
    var body= _.pick(req.body, 'vehicle_name', 'model', 'seria_number', 'year', 'cost', 'amount_sale');

    // db.vehicle.create(body).then(function(vehicle){
    //     res.json(vehicle.toJSON());
    // }).then(function(){
    //     res.redirect('/');
    // });

   db.vehicle.create({
        vehicle_name : req.body.vehicle_name,
        model : req.body.model,
        seria_number : req.body.seria_number,
        year: req.body.year,
        cost: req.body.cost,
        amount_sale: req.body.amount_sale
    
   }).then(function(vehicle){
       res.redirect('/');
   })
});



//GET
app.get('/customer', function(req, res){
    var query = req.query;

    db.customer.findAll().then(function(customer){
        res.json(customer);
    }, function(e){
        res.status(500).send();
    });
});

app.get('/salesman', function(req, res){
    var query = req.query;

    db.salesman.findAll().then(function(salesman){
        res.json(salesman);
    }, function(e){
        res.status(500).send();
    });
});

app.get('/', function(req, res){
    var query = req.query;

    db.vehicle.findAll().then(function(vehicles){
        res.render('index',{
            title: 'Vehicles',
            vehicles: vehicles
        });
    }, function(e){
        res.status(500).send();
    });
});

app.get('/add', function(req, res){
    var query = req.query;

    res.render('add_vehicle', {
        title:  'Add a new vehicle'
    })
});


//PUT

// app.put('/vehicle/edit/:id', function(req, res){
//     var editId = parseInt(req.param.id, 10);
//     var matchedId = _.findWhere()
// })

db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log('Express listening on port ' + PORT + '!');
    });
})