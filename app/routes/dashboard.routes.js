module.exports = app => {
  const  dashboard = require("../controllers/dashboard.controller.js");
  var router = require("express").Router();

  router.get("/dashboard/workers", dashboard.totalHoursByWorkers);
  //router.get("/dashboard/workers/:worker_id", user.login);

  //router.get("/dashboard/works", user.login);
  //router.get("/dashboard/works/:id", user.login);
  router.get("/dashboard/work", dashboard.totalHoursByWork);

  app.use('/api/v1.0', router);


}
