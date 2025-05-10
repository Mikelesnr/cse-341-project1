//express server
require('dotenv').config();

const express = require('express');
const app = express();
const mongodb = require('./data/database.js');

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.connDb((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return;
    }
    else {
        app.listen(port, () => {
            console.log(`Database connected and Server is running on port ${port}`);
        })
    }
}
);

