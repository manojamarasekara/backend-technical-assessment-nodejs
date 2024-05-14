const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./src/config/database');
const userRoutes  = require('./src/routes/userRoutes');
const authRoutes  = require('./src/routes/authRoutes');
const inventoryRoutes  = require('./src/routes/inventoryRoutes');
const customerRoutes  = require('./src/routes/customerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

/**
 * Uncomment the following block to test the database connection
 */
// app.get('/test-db', (req, res) => {
//   const status = db.testDBConnection();
//   if(status){
//     res.send("DB connected successfully");
//   } else {
//     res.send("DB not connected");
//   }
// });

// user routes
app.use('/api/users', userRoutes);
app.use('/api/login', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use("/api/customers", customerRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
