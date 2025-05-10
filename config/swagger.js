const dotenv = require("dotenv");
dotenv.config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contacts API",
      version: "1.0.0",
      description: "A simple API for managing contacts"
    },
    servers: [
      { url: process.env.SERVER_URL || "http://localhost:3000" } // Change to your actual server URL
    ]
  },
  apis: ["./routes/*.js"] // Points to your API route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
