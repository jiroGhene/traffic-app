var express = require('express');
var router = express.Router();
var formCollection = require('../schemas/collections');
router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/', function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;
  let db = formCollection.register();
  req.checkBody('email', 'Valid email is required').isEmail();
  req.checkBody('password', 'Password required').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render('login', {error: errors});
  } else {
    db['model'].findOne({email: email}, 'email name password', function (err, snapshot) {
      if (snapshot != null) {
        if (pass !== snapshot.password) {
          res.render('login', {error: [{param: 'password', msg: 'Incorrect login details'}]});
        } else {
          res.redirect('/home');
        }
      } else {
        res.render('login', {error: [{param: 'email', msg: 'User not found'}]});
      }
    });
  }
});


module.exports = router;
