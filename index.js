const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// OpenAPI
const swaggerUi = require('swagger-ui-express');
const yamlJs = require('yamljs');
const swaggerDocument = yamlJs.load('./swagger.yaml');

// Parse body
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).send(err.message || 'Internal Server Error');
});

app.listen(port, () => console.log(`Running at http://localhost:${port} and docs at http://localhost:${port}/docs`));




