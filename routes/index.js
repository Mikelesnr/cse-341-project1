const routes = require('express').Router();
const helloController = require('../controllers/hello');

routes.get("/", helloController.helloRoute);

routes.use('/contacts', require('./contacts'));

module.exports = routes;