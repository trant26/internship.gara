module.exports = function(sequelize, DataTypes){
    var Salesman = sequelize.define('salesman', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
        salesman_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salesman_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salesman_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Salesman;
}