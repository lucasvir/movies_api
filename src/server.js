require('express-async-errors');

const AppError = require('./utils/AppError');
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

const database = require('./database/sqlite');
database();

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

const PORT = 5555;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
