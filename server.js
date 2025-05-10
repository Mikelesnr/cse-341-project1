//express server
require('dotenv').config();

const express = require('express');
const { swaggerUi, specs } = require("./config/swagger");
const app = express();
const mongodb = require('./data/database.js');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongodb.connDb((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return;
    }
    else {
        app.listen(port, () => {
            console.log(`Database connected and Server is running on port ${port}`);
            console.log("📜 Swagger API Docs available at http://localhost:3000/api-docs");
        })
    }
}
);

