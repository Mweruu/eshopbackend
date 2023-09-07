module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('orderItem',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
        quantity:{
          type:DataTypes.STRING,
          allowNull:false
        },

        },{});
        OrderItem.associate = function(models){
        OrderItem.hasMany(models.product,{
        foreignKey:'orderId'
        })
        };

        return OrderItem;
};