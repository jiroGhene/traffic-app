module.exports.setup = function (app) {
  var expressValidator = require('express-validator');
  var bodyParser = require('body-parser');
  var handlebars = require('express3-handlebars').create({partialsDir: [
      'views/partials/'
    ]});
// set port and engine
  app.set('port', process.env.PORT || 3000);
  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');

// middeleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.'),
              root = namespace.shift(),
              formParam = root;
      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return{
        param: formParam,
        msg: msg,
        value: value
      };
    }
  }));

}