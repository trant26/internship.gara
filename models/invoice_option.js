module.exports = function(sequelize, DataTypes){
    var Invoice_option = sequelize.define('invoice_options', {
       id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       }
    })

    return Invoice_option;
};