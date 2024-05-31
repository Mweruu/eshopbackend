module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
        name:{
          type:DataTypes.STRING,
          allowNull:false
        },
        email:{
          type:DataTypes.STRING,
          allowNull:false
        },
        passwordHash:{
          type:DataTypes.STRING,
          allowNull:false
        },
        phone:{
          type:DataTypes.STRING,
          allowNull:false
        }, 
        street:{
          type:DataTypes.STRING,
          allowNull:false
        },
        apartment:{
          type:DataTypes.STRING,
          allowNull:false
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
        isAdmin:{
          type:DataTypes.BOOLEAN,
          allowNull:true
        }

        },{});
        User.associate = function(models){
          User.hasMany(models.product, {
            foreignKey:'userId'
          })
          User.hasMany(models.order, {
            foreignKey:'userId'
          })
          User.hasMany(models.orderItem, {
            foreignKey:'userId'
          })
        };

        return User;
    };