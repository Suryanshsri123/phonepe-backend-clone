require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const swaggerUi = require('swagger-ui-express');

// Routes
const authRoutes = require('./src/routes/authRoutes');
const txnRoutes = require('./src/routes/txnRoutes');
const walletRoutes = require('./src/routes/walletRoutes');

let swaggerDocument = {};

try {
    swaggerDocument = require('./swagger-output.json');
} catch (e) {
    console.log("Swagger doc not generated yet.");
}

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('PhonePe Clone Backend is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions', txnRoutes);
app.use('/api/wallet', walletRoutes);

module.exports = app;