const dotenv = require('dotenv');
dotenv.config();

const helloRoute = (req, res) => {  
    res.send(`
        <h1>Hello, world! 👋</h1>
        <p>Welcome to the API. You can explore the documentation here:</p>
        <a href="${process.env.SERVER_URL}/api-docs" target="_blank">📜 View Swagger API Docs</a>
    `);
};

module.exports = {helloRoute};