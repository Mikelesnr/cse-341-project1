// Load environment variables
require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./config/swagger.json");
const mongodb = require("./data/database.js");

const app = express();
const port = process.env.PORT || 3000;
const serverUrl = process.env.SERVER_URL || "http://localhost:3000";

// Middleware
app.use(express.json());

// Routes
app.use("/", require("./routes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Connect to MongoDB and start server
mongodb.connDb((err) => {
  if (err) {
    console.error("❌ Failed to connect to the database:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(
        `✅ Database connected and Server is running at ${serverUrl}`
      );
      console.log(`📜 Swagger API Docs available at ${serverUrl}/api-docs`);
    });
  }
});
