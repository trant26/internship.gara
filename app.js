var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var path = require('path');
//var methodOverride = require('method-override');
//var validate = require('form-validate');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

// var vehicles = require('./routes/vehicle'); 
//var routes = require('./routes/index');
var app = express();
var PORT = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));


//app.use(validator([]));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(expressValidator());
//app.use(express.methodOverride());
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));


var options = {

};
//app.use(validate(app, options));

// app.configure('development', function(){
//     app.use(express.errorHandler());
// })


var customer = [];
var customerNextId = 1;

var salesman = [];
var salesmanNextId = 1;
var vehicle = [];
var vehicleNextId = 1;

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

app.post('/add', function(req, res, next){
    
    //var body= _.pick(req.body, 'vehicle_name', 'model', 'seria_number', 'year', 'cost', 'amount_sale');
    req.check('vehicle_name', 'Vehicle name is required').notEmpty();
    req.check('model', 'Model is required').notEmpty();
    req.check('seria_number', 'Seria number is required').notEmpty();
    req.check('year', 'Year must be number').isInt();
    req.check('year', 'Year is required').notEmpty();
    req.check('cost', 'Cost must be number').isFloat();
    req.check('cost', 'Cost is required').notEmpty();
    req.check('amount_sale', 'Amount sale must be number').isFloat();
    req.check('amount_sale', 'Amount sale is required').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);
    var current_vehicle = {
         vehicle_name : req.body.vehicle_name,
            model : req.body.model,
            seria_number : req.body.seria_number,
            year: req.body.year,
            cost: req.body.cost,
            amount_sale: req.body.amount_sale
    }

    if (errors){
        req.session.errors = errors;
        req.session.success = false;

        res.render('add_vehicle', {
            title: 'Add vehicle',
            errors,
            current_vehicle
        });
        console.log(current_vehicle);
    }
    else {
        db.vehicle.create({
            vehicle_name : req.body.vehicle_name,
            model : req.body.model,
            seria_number : req.body.seria_number,
            year: req.body.year,
            cost: req.body.cost,
            amount_sale: req.body.amount_sale
        
        })
        res.redirect('/');
    }
});

app.post('/vehicle/:id', function(req, res){
    var body= _.pick(req.body, 'id', 'vehicle_name', 'model', 'seria_number', 'year', 'cost', 'amount_sale');
    var id = req.params.id;

    db.vehicle.update({
            vehicle_name : req.body.vehicle_name,
            model : req.body.model,
            seria_number : req.body.seria_number,
            year: req.body.year,
            cost: req.body.cost, 
            amount_sale: req.body.amount_sale
          
    },{where: {id}}).then(function(vehicle){
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
            vehicles: vehicles,
            message: ' ',
            error: {}
        });
    }, function(e){
        res.status(500).send();
    });
});

app.get('/add', function(req, res){
    var query = req.query;
    var errors = req.validationErrors();
    var current_vehicle = {
         vehicle_name : req.body.vehicle_name,
            model : req.body.model,
            seria_number : req.body.seria_number,
            year: req.body.year,
            cost: req.body.cost,
            amount_sale: req.body.amount_sale
    }

    res.render('add_vehicle', {
        title:  'Add a new vehicle',
        errors: errors,
        current_vehicle
    })
});

app.get('/vehicle/edit/:id', function(req, res){
    
    var editId = parseInt(req.params.id, 10);
    var matchedId = _.findWhere(vehicle, {id: editId});
    var body = _.pick(req.body, 'vehicle_name', 'model', 'seria_number', 'year', 'cost', 'amount_sale');

    db.vehicle.findById(editId).then(function(vehicle){
        if (!!vehicle){
            res.render('edit_vehicle',{
                title : 'Edit vehicle',
                vehicle: vehicle 
            }) 
        }
    })
}); 

app.get('/home', function(req,res){
    var query = req.query;

    db.vehicle.findAll().then(function(vehicles){ 
        res.render('home',{
            title: 'Vehicles',
            vehicles: vehicles
        });
    }, function(e){
        res.status(500).send(); 
    });
});

 
  
//DELETE

app.get('/delete/:id', function(req, res){
    var editId = parseInt(req.params.id, 10);
    db.vehicle.destroy({
        where: {
            id : editId
        }
    }).then(function(vehicle){
        res.redirect('/'); 
    })
}) 
 

db.sequelize.sync().then(function(){ 
    app.listen(PORT, function(){
        console.log('Express listening on port ' + PORT + '!');
    });
})