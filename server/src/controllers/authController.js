// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await User.findOne({ where: { username } }).then(user => {
          // Check if user exists
          if (user) {
            return user;
          } else {
            console.error(user);
            return res.status(401).json({ error: 'Cannot find user' });
          }
        });
        
        console.log(user.username, user.password);
        

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token to client
        res.status(200).json({
          message: 'Successfully logged in',
          token 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { login };
