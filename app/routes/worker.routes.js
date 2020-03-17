module.exports = app => {
  const Worker = require("../controllers/worker.controller.js");
  var router = require("express").Router();

  //create a new Worker
  router.post("/", Worker.create);

  //get Workers
  router.get("/", Worker.getAllWorkers);

  // Retrieve a single Tutorial with id
  router.get("/:id", Worker.getWorker);

  // Update Worker
  router.put("/:id", Worker.updateWorker);

  // Delete a Tutorial with id
  router.delete("/:id", Worker.deleteWorker);

  app.use('/api/v1.0/Workers', router);

};
