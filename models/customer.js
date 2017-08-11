module.exports = function(sequelize, DataTypes){
    var Customers = sequelize.define('customers', {
       id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    

    return Customers;
};