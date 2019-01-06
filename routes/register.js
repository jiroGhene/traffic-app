var express = require('express');
var router = express.Router();
var formCollection = require('../schemas/collections');

router.get('/', function (req, res) {
  res.render('register');
});

router.post('/', function (req, res) {
  let reg_name = req.body.name;
  let reg_email = req.body.email;
  let reg_pass = req.body.password;
  req.checkBody('name', "Name is required").notEmpty();
  req.checkBody('email', "Email is not valid").isEmail();
  req.checkBody('password', "Password is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render('register', {error: errors});
  } else {
    formCollection.register({name: reg_name, email: reg_email, password: reg_pass});
    res.redirect('/login');
  }
});


module.exports = router;
