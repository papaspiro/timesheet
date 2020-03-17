module.exports = app => {
  const work = require("../controllers/work.controller.js");
  var router = require("express").Router();

  //create a new work
  router.post("/", work.create);

  //get works
  router.get("/", work.getAllWorks);

  // Retrieve a single Tutorial with id
  router.get("/:id", work.getWork);

  // Update work
  router.put("/:id", work.updateWork);

  // Delete a Tutorial with id
  router.delete("/:id", work.deleteWork);

  app.use('/api/v1.0/works', router);

};
