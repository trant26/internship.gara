module.exports = function(sequelize, DataTypes){
    var Invoice = sequelize.define('invoices', {
       id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
       price_sold: {
           type: DataTypes.FLOAT,
           allowNull: false
       },
       is_tradein: {
           type: DataTypes.BOOLEAN,
           allowNull: false
       }
    })

    return Invoice;
};