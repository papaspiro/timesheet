module.exports = app => {
  const workhours = require("../controllers/workhours.controller.js");
  var router = require("express").Router();

  //create a new workhours
  router.post("/", workhours.create);

  //get workhours
  router.get("/", workhours.getAllWorkhours);

  // Retrieve a single  with id
  router.get("/:id", workhours.getWorkhours);

  // Update workhours
  router.put("/:id", workhours.updateWorkhours);


  //Associations

  //workhours by  works
  router.get("/works", workhours.getByWorks);

  //workhours by particular work
  router.get("/works/:id", workhours.getByWork);

  //workhours by  workers
  router.get("/workers", workhours.getByWorkers);

  //workhours by a particular worker
  router.get("/workers/:id", workhours.getByWork);

  app.use('/api/v1.0/workhours', router);

};
