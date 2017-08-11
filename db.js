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
db.saler = sequelize.import(__dirname + '/models/saler.js');
db.menufacturer = sequelize.import(__dirname + '/models/menufacturer.js');
db.options = sequelize.import(__dirname + '/models/options.js');
db.invoice = sequelize.import(__dirname + '/models/invoice.js');
db.vehicles = sequelize.import(__dirname + '/models/vehicles.js');
db.invoice_options = sequelize.import(__dirname + '/models/invoice_options.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.invoice.belongsTo(db.customer);
db.invoice.belongsTo(db.saler);
db.invoice.belongsTo(db.menufacturer);
db.invoice.belongsTo(db.vehicles);
db.invoice_options.belongsTo(db.invoice);
db.invoice_options.belongsTo(db.options);

module.exports = db