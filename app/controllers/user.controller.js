const db = require("../models");
const User = db.user;



//console.log("***********TESTING ****************")
//console.log(db)
//console.log(User);
//console.log("***********TESTING ****************")

const Op = db.Sequelize.Op;

const { roles } = require('../roles')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function generateHash(password){
   return await bcrypt.hash(password,10);
}

async function validatePassword(password, hashOfPassword){
  return await bcrypt.compare(password,hashOfPassword);
}

// new worker
exports.signup = (req,res) => {
   User.findOne({
        where: {
            email: req.body.email
               }
   }).then(function (user){
       if (user) {
         res.status(400).json({
           code: 400,
           data:null,
           message: "Duplicate Email"
         });
       }
    });

    User.create({
          role: req.body.role,
          email: req.body.email

        })
      .then(data => {
            id = data.id;
            const token = jwt.sign({ userId: data.id },
               process.env.JWT_SECRET, {expiresIn: "1d" });

            //update with token
            data.token = token;
            data.save();
            res.status(201).json({code: 201,message: 'success',
                          data:data,token});
          })
          .catch(err => {
            res.status(500).json({
              code: 500,
              data:null,
              message: err.message
            });
          })
    };

exports.login = async (req,res,next) => {
       User.findOne({
            where: {
                email: req.body.email
                   }
       })
       .then( user => {
           if (!user ){
              res.status(400).json({
                code: 400,
                message: "Wrong Email"
              })
           }
          else {
           //bcrypt.compare(req.body.password, user.password,function (err,
            //  result) {
          const valid =  validatePassword(req.body.password,user.password);

          if (valid) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d" });
            //update token
            user.token = token;
            user.save();
            res.status(200).json({
              data: { email: user.email, role: user.role },
                token
          })

          }
          else {
              res.send('Incorrect password');
              //res.redirect('/');
          }
    //    });
       }
    })
    .catch(err => {
      res.status(500).json({
        code: 500,
        data:null,
        message: err.message
      });
    })
}

exports.getUser = async (req, res) => {
  const email = req.body.email;
  await  User.findOne({
        where: {
            email: req.body.email
               }
   })
  .then(data => {
      res.status(200).json({
        code : 200,
        message : "success",
        data: data,
      })

    })
    .catch(err => {
      res.status(500).send({
        message: "Error User"
      });
    });
};

exports.updateUser = async (req, res) => {
  const email = req.params.email;
  await User.update(req.body, {
    where: { email: email }
  })
  .then(num => {
      if (num == 1) {
        res.status(200).json({
          code : 200,
          message : "success",
          data: null
        })
      } else {
        res.status(200).json({
          code : 200,
          message : "Failure",
          data: null
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        code : 5000,
        message: "Error updating Tutorial with id=" + id
      });
    });
};


//Authorizations
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role);
   if (!permission.granted) {
    return res.status(401).json({
      data: null,
      code: 402,
      message: "Insufficient permission"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}

exports.loginRequired = async (req, res, next) => {
 try {

   //details of a logged in user
  const user = res.locals.loggedInUser;
  if (!user)
   return res.status(401).json({
     code: 401,
     message: " Error login required"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}
