var db = require('mysql');
var connection = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'traffik'
});
connection.connect();
const dbQuery = function (sql, callback) {
  connection.query(sql, callback);
};

module.exports.snapshot = {
  dbQuery
};
