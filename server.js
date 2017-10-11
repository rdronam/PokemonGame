var Express = require("express");
var bodyParser = require("body-parser");
var App = Express();
var PORT = process.env.PORT || 8085;

var db = require("./app/models");

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.text());
App.use(bodyParser.json({ type: "application/vnd.api+json" }));

App.use(Express.static("./app/public"));

require("./app/routes/html-routes.js")(App);
require("./app/routes/trainers-api-routes.js")(App);

db.sequelize.sync({ force: false }).then(function() {
  App.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});