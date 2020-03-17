const db = require("../models");
const Worker = db.worker;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    worker = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    work_id: req.body.work_id,
    worker_id: req.body.worker_id

  }
  Worker.create(worker)
  .then(data => {
    res.status(201).json({
      code: 201,
      message: "New Worker created",
      data: data
    })
  })
  .catch( err =>{
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Error while creating Worker",
    })
  });
};

exports.getWorker = (req, res) => {
  const id = req.params.id;

  Worker.findByPk(id)
  .then(data => {
    if(data){
      res.status(200).json({
        status: "success",
        code: 200,
        message:"Single Worker",
        data: data
      })
    }
    else{
      res.status(404).json({
        status: "Failure",
        code: 404,
        message:"Worker not found",
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

exports.updateWorker = (req, res) => {
  const id = req.params.id;

  Worker.update(req.body, {
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
          status: "failed to update Worker",
          code: 200,
          message: "New Worker created",
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


exports.deleteWorker = (req, res) => {
  const id = req.params.id;

  Worker.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Worker was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Worker with id!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Worker"
      });
    });
};

exports.getWorkerByCondition = (req,res) => {

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

 Worker.findAll({ where: condition })
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving Worker."
     });
   });
};

//}

exports.getAllWorkers = (req, res) => {
  Worker.findAll({ where: {}})
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
