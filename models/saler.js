module.exports = function(sequelize, DataTypes){
    return sequelize.define('saler', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
        saler_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        saler_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        saler_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}