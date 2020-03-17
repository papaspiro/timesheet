"use strict"
//uuid = require('uuid/v4')

module.exports = (sequilize,Sequelize) => {
  const User = sequilize.define('user',{

    email:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: Sequelize.STRING,
      default: 'basic',
      enum: ["basic", "worker", "admin"]
    },
    token: {
      type: Sequelize.STRING,
    }
  },
  {
   paranoid: true,
   underscored: true
 }
);
return User;
}
