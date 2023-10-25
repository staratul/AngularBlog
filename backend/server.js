const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config();

connectDB();

// Route files
const auth = require('./routes/auth');

const app = express();

app.use(express.json());

// Enabled CORS
app.use(cors());

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// Mount route
app.use('/api/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));