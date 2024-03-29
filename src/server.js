require('express-async-errors');
require('dotenv/config');

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const uploadConfig = require('./configs/upload');
const AppError = require('./utils/AppError');

const app = express();
app.use(express.json());

app.use(cors());

const database = require('./database/sqlite');
database();

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));

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

const PORT = process.env.PORT || 5555;
app.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);
