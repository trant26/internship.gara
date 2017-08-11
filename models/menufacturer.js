module.exports = function(sequelize, DataTypes){
    var Menufacturer = sequelize.define('menufacturer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
       },
        menufacturer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Menufacturer;
}