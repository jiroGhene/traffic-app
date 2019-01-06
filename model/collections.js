var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  name: {type: String},
  gender: {type: String}
});

var registerSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  password: {type: String}
});

module.exports.profile = function () {
  mongoose.model('profile', profileSchema);
};

module.exports.register = function (data) {
  var registeration = mongoose.model('user', registerSchema);
  registeration(data).save();
  return {"model": registeration};
};