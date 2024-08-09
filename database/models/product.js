
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product',{
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
        name:{
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.STRING,
        },
        richDescription:{
            type: DataTypes.STRING(1234),
        },
        image:{
            type: DataTypes.STRING,
        },
        images:{
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        brand:{
            type: DataTypes.STRING,
            defaultValue:''
        },
        price:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        countInStock:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        rating:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        // numReviews:{
        //     type: DataTypes.DATE,
        //     defaultValue: null
        // },
        isFeatured:{ 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
       
    
    },{});
    Product.associate = function(models){
        Product.belongsTo(models.category, {
            foreignKey:'categoryId'
        })
        Product.belongsTo(models.user, {
            foreignKey:'userId'
        })
        Product.hasMany(models.orderItem, {
            foreignKey:'productId'
          })
         // Product.belongsTo(models.order, {
        //     foreignKey:'orderId'
        // })
    };

        return Product;
    };