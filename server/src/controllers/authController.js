const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } }).then(user => {
          if (user) {
            return user;
          } else {
            return res.status(401).json({ 
              error: 'User not found',
              message: 'User authentication failed. Cannot find user.'
            });
          }
        });
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
              error: 'Invalid password',
              message: 'User authentication failed. Provided credentials are incorrect.'
            });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token to client
        res.status(200).json({
          message: 'Authentication success',
          token 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { login };
