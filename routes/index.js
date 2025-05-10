const routes = require('express').Router();
const helloController = require('../controllers/hello');

routes.get("/", helloController.helloRoute);

module.exports = routes;