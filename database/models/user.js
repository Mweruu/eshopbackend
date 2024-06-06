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
          allowNull:true
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
          allowNull:true
        }, 
        street:{
          type:DataTypes.STRING,
          allowNull:true
        },
        apartment:{
          type:DataTypes.STRING,
          allowNull:true
        },
        city:{
          type:DataTypes.STRING,
          allowNull:tru
        },
        zip:{
          type:DataTypes.STRING,
          allowNull:true
        },
        country:{
          type:DataTypes.STRING,
          allowNull:true
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