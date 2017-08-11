var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production'){
    sequelize = new Sequelize(process.env.DATABASE_URL, {
       dialect: 'postgres' 
    });
} else {
    sequelize = new Sequelize(undefined, undefined, undefined,{
        'dialect': 'sqlite',
        'storage': __dirname + '/data/gara-database.sqlite'
    });
}


var db = {};

db.customer = sequelize.import(__dirname + '/models/customer.js');
db.salesman = sequelize.import(__dirname + '/models/salesman.js');
db.manufacturer = sequelize.import(__dirname + '/models/manufacturer.js');
db.option = sequelize.import(__dirname + '/models/option.js');
db.invoice = sequelize.import(__dirname + '/models/invoice.js');
db.vehicle = sequelize.import(__dirname + '/models/vehicle.js');
db.invoice_option = sequelize.import(__dirname + '/models/invoice_option.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.invoice.belongsTo(db.customer);
db.invoice.belongsTo(db.salesman);
db.invoice.belongsTo(db.manufacturer);
db.invoice.belongsTo(db.vehicle);
//db.invoice_option.belongsTo(db.invoice);
db.invoice.belongsToMany(db.option, {through: db.invoice_option});
db.option.belongsToMany(db.invoice, {through: db.invoice_option});

module.exports = db