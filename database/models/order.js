module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },

        shippingAddress1: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shippingAddress2: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city:{
          type:DataTypes.STRING,
          allowNull:false
        },
        zip:{
          type:DataTypes.STRING,
          allowNull:false
        },
        country:{
          type:DataTypes.STRING,
          allowNull:false
        },
        phone:{
          type:DataTypes.STRING,
          allowNull:false
        }, 
        status:{
          type:DataTypes.STRING,
          allowNull:false,
          defaultValue:'pending'
        }, 
        totalPrice:{
          type:DataTypes.STRING,
          allowNull:false
        }, 
        // user:{
        //   type:DataTypes.STRING,
        //   allowNull:false
        // }, 
        dateOrdered:{
          type:DataTypes.DATE,
          allowNull:true,
        }
        },{});
        Order.associate = function(models){
          Order.hasMany(models.product, {
            // foreignKey:'orderId'
          })
          Order.hasMany(models.orderItem, {
            foreignKey:'orderId'
          })
          Order.belongsTo(models.user,{
            foreignKey:'userId'
          })
        };

        return Order;
    };