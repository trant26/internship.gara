module.exports = function(sequelize, DataTypes){
    var Option = sequelize.define('options', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
        part_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quanity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount_sale: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    })
    return Option;
}