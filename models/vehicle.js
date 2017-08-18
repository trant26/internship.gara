module.exports = function(sequelize, DataTypes){
    var Vehicle = sequelize.define('vehicles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
       vehicle_name: {
           type: DataTypes.STRING,
           allowNull: false,
       },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seria_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
            isNumeric: true
        },
        amount_sale: {
            type: DataTypes.FLOAT,
            allowNull: false,
            isNumeric: true
        }
    })
    return Vehicle;
}