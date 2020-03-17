const db = require("../models");
const Workhours = db.workhours;
const Worker = db.worker;
const Work = db.work;

const Op = db.Sequelize.Op;


exports.create = (req, res) => {

    workhours = {
    date: req.body.date,
    hours: req.body.hours,
    cworker_id: req.body.worker_id,
    work_id:   req.body.work_id,

  }



Workhours.create(workhours
  /*,
    {
      include: [
            Work.findByPk(work_id)  ,
            Worker.findByPk(worker_id)
        ]
    }*/

  )
  .then(data => {
    res.status(201).json({
      code: 201,
      message: "New Workhours created",
      data: data
    })
  })
  .catch( err =>{
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error while creating Workhours",
    })
  });
};

exports.getWorkhours = (req, res) => {
  const id = req.params.id;

  Workhours.findByPk(id)
  .then(data => {
    if(data){
      res.status(200).json({
        status: "success",
        code: 200,
        message:"Single Workhours",
        data: data
      })
    }
    else{
      res.status(404).json({
        status: "Failure",
        code: 404,
        message:"Workhours not found",
        data: data
      })
    }

  })
  .catch( err => {
      res.status(500).json({
        code : 500,
        status: 'error',
        data : null,
        message: err.message// "Fatal Error whilst process result"
      })
    });

};

exports.updateWorkhours = (req, res) => {
  const id = req.params.id;

  Workhours.update(req.body, {
    where: { id: id }
  })
  .then(num => {
      if (num == 1) {
        res.status(201).json({
          status: "succes",
          code: 201,
          message: "successfully update",
          data:null

        })

      } else {
        res.status(200).json({
          status: "failed to update Workhours",
          code: 200,
          message: "New Workhours created",
          data: null
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};


exports.deleteWorkhours = (req, res) => {
  const id = req.params.id;

  Workhours.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Workhours was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Workhours with id!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Workhours"
      });
    });
};

exports.getWorkhoursByCondition = (req,res) => {

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

 Workhours.findAll({ where: condition })
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving Workhours."
     });
   });
};


exports.getAllWorkhours = (req, res) => {
  Workhours.findAll({ where: {}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting records."
      });
    });
};




//Associations
exports.getByWorks = (req,res) => {
}

exports.getByWork = (req,res) => {
}

exports.getByWorkers = (req,res) => {
}

exports.getByWorker = (req,res) => {
}
