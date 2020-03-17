const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const path = require('path')

require("dotenv").config({
 path: path.join(__dirname, "./.env")
});


console.log(process.env.JWT_SECRET);

const app = express();

var corsOptions = {
  origin: "http://0.0.0.0:1620"
};

app.use(cors(corsOptions));

//parse json
app.use(bodyParser.json());

// parse forms -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
//db.sequelize.sync();


db.sequelize.sync({ force: true }).then(() => {
  console.log("Re -Syncing");
});

//Associations
db.workhours.belongsTo(db.worker);
db.worker.hasMany(db.workhours);

db.workhours.belongsTo(db.work);
db.work.hasMany(db.workhours)


require("./app/routes/user.routes.js")(app);
require("./app/routes/work.routes.js")(app);
require("./app/routes/worker.routes.js")(app);
require("./app/routes/workhours.routes.js")(app);



const PORT = process.env.PORT || 1888;
app.listen(PORT, () => {
  console.log('Up and running');
});
