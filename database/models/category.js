module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
          },
        name:{
          type: DataTypes.STRING,
          defaultValue:'',
          allowNull: false,

        },
        color:{
          type: DataTypes.STRING,
          defaultValue:''
        },
        icon:{
          type: DataTypes.STRING,
          defaultValue:''
        },
        image:{
          type: DataTypes.STRING,
          defaultValue:''
        }
        },{});

        Category.associate = function(models){
          Category.hasMany(models.product,{
            foreignKey:'categoryId'
          })
        };

        return Category;
    };