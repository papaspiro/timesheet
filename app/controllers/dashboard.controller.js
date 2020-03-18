const db = require("../models");
const Workhours = db.workhours;
const Worker = db.worker;
const Work = db.work;
const Op = db.Sequelize.Op;
const sq = db.Sequelize;
const sequelize = require("sequelize");

fn = db.Sequelize.fn;
exports.totalHoursByWorkers = async (req,res) => {
  start_date = req.body.start_date
  start_time = req.body.start_time;


  await Workhours.findAll({
    attributes:[
       'worker_id',

       [db.Sequelize.fn('Sum', db.sequelize.col('hours')),'Total Hours']
     ],
   group: 'worker_id',
    raw:true,


  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while getting records."
      });
    });
}



exports.totalHoursByWork = async (req,res) => {
  start_date = req.body.start_date
  start_time = req.body.start_time;


  await Workhours.findAll({
    attributes:[
       'work_id',

       [db.Sequelize.fn('Sum', db.sequelize.col('hours')),'Total Hours']
     ],
   group: 'work_id',
    raw:true,


  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while getting records."
      });
    });
}

/*
* for date filtering
model.findAll({
  where: {
    start_datetime: {
      $gte: moment().subtract(7, 'days').toDate()
    }
  }
})

const { Op } = require('sequelize')

model.findAll({
  where: {
    start_datetime: {
      [Op.gte]: moment().subtract(7, 'days').toDate()
    }
  }
})
*/
