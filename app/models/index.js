const dbConf  = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize('workinghours', 'root', 'lionheart', {
  host: 'localhost',
  dialect: 'mysql'
});
try {
   sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.work = require("./work.model.js")(sequelize, Sequelize);
db.worker = require("./worker.model.js")(sequelize, Sequelize);
db.workhours = require("./workhours.model.js")(sequelize, Sequelize);
//console.log(db.workhours);
//console.log(db.user)
//console.log(db.work)



module.exports = db;
