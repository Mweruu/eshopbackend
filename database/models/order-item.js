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
          type:DataTypes.INTEGER,
          allowNull:false
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
      
        },{});
        OrderItem.associate = function(models){
          OrderItem.belongsTo(models.product,{
            foreignKey:'productId'
          })
          OrderItem.belongsTo(models.order,{
            foreignKey:'orderId'
          })
          OrderItem.belongsTo(models.user,{
            foreignKey:'userId'
          })
        };

        return OrderItem;
};
