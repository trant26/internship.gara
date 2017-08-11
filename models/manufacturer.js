module.exports = function(sequelize, DataTypes){
    var Manufacturer = sequelize.define('manufacturer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
        manufacturer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Manufacturer;
}