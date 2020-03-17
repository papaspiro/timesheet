module.exports = app => {
  const user = require("../controllers/user.controller.js");
  //const worker = require("../controllers/worker.controller.js");

  var router = require("express").Router();

  router.post("/signup", user.signup);
  router.post("/login", user.login);


/*
router.get('/user/:id', userController.allowIfLoggedin, userController.getUser);
router.get('/users', userController.allowIfLoggedin,
              userController.grantAccess('readAny', 'profile'),
              userController.getUsers);


router.put('/user/:id', userController.allowIfLoggedin,
        userController.grantAccess('updateAny', 'profile'),
         userController.updateUser);


router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
*/



  router.get("/somethingsomething", (req,res) => {
    res.json({message:"API Working Hours"});

  });

  app.use('/api/v1.0', router);


}
