const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.STRING,
      allowNull:false,
      primaryKey: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifespan:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin:{
      type:DataTypes.STRING,
      defaultValue:"db",
    }
  },
  {
    timestamps: false
  });
};



