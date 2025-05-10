//express server
require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

console.log(`Server is listening on port ${port}`);