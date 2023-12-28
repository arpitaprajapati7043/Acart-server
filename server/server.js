const express = require('express');
const helmet = require('helmet');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnection = require('./dbConnection');
const router = require('./routes/router');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const requestLogger = require('./utils/requestLogger');
const errorHandler = require('./utils/errorHandler');

const allowedOrigins = ['http://localhost:3000', 'https://acart-server.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'https://apis.google.com'],
    styleSrc: ["'self'", 'https://fonts.googleapis.com'], // Add other style sources
    // Add other directives as needed
  },
}));

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/router', router);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => {
  console.group('Server started on Port 8080');
});
