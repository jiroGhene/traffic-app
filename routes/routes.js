var express = require('express');
var route = express.Router();
var database = require('../model/db');
module.exports = {
  index: route.get('/', (req, res) => {
    res.render('index');
  }),

  home: route.get('/home', (req, res) => {
    database.snapshot.dbQuery("select id, road_name from roads where state_name='lagos'", function (err, rows) {
      res.render('home', {
        road: rows
      });
    });
  }),

  routes: route.get('/route/:id', (req, res) => {
    var id = req.params.id;
    database.snapshot.dbQuery("select road_name from roads where roads.id=" + id, function (err, road_name) {
      database.snapshot.dbQuery("select routes.* from routes where routes.idFrom_road=" + id, function (err, routes) {
        res.render('route', {
          route: routes,
          road: road_name
        });
      });
    });
  }),

  ajaxRoutes: route.get('/ajaxRoute/:id', (req, res) => {
    var id = req.params.id;
    database.snapshot.dbQuery("select routes.* from routes where routes.idFrom_road=" + id, function (err, rows) {
      res.render('ajaxRoute', {
        route: rows
      });
    });
  }),

  commentbox: route.get('/get_comment_box/:id', (req, res) => {
    var id = req.params.id;
    database.snapshot.dbQuery("select route_id, from_route, idTo_road, to_route from routes where route_id=" + id, function (err, route) {
      res.render('comment-box', {
        route_desc: route
      });
    });
  }),

  comments: route.get('/get_comments/:id', (req, res) => {
    var id = req.params.id;
    database.snapshot.dbQuery("DELETE FROM comments WHERE time < DATE_SUB(NOW(),INTERVAL 1 HOUR)", null);
    database.snapshot.dbQuery("select comments.*, DATE_FORMAT(time,'%l:%i %p') AS PerTime from comments where route_id=" + id + " and report_abuse=0 and time>DATE_SUB(NOW(),INTERVAL 1 HOUR) order by time desc", function (err, comment) {
      database.snapshot.dbQuery("SELECT AVG(rate) as rating FROM comments where route_id=" + id + " and report_abuse=0 and time>DATE_SUB(NOW(),INTERVAL 1 HOUR)", function (err, rating) {
        database.snapshot.dbQuery("select name from color where id=" + Math.ceil(parseFloat(rating[0].rating)), function (err, color) {
          res.render('comments', {
            comments: comment,
            route_desc: route,
            color_rating: color
          });
        });
      });
    });
  }),

  post_comments: route.post('/post_comment/:id', (req, res) => {
    var route_id = req.params.id;
    var name = req.body.name;
    var comment = req.body.comment;
    var source = req.body.source;
    var rating = req.body.light;
    database.snapshot.dbQuery("INSERT INTO comments VALUES(NULL, '" + route_id + "', '" + comment + "', '" + name + "', '" + source + "', '" + rating + "', '0', NOW())", function (err, rows) {
      res.send('Comment posted');
    });
  }),

  errors: route.use((req, res, next) => {
    if (res.status(404)) {
      res.status(404);
      res.send('Error page');
    } else if (res.status(500)) {
      res.status(500);
      res.send('Server Error');
    }
  })
};
