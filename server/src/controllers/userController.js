// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Implement controller methods for user operations
const getAllUsers = async (req, res) => {
  try {
      const users = await User.findAll();
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
  }
};

const addUser = async (req, res) => {
  try {
      const { name, username, password, role } = req.body;
      
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            // Handle error
        } else {
            // Store the hashed password in the database
            User.create({ name, username, password: hash, role })
                .then(user => {
                    // User created successfully
                    res.status(201).json({ 
                      message: 'User created successfully',
                      data: { 
                        name: user.name, 
                        username: user.username, 
                        role: user.role
                      }
                     });
                })
                .catch(error => {
                    console.error('Error creating user:', error);
                    res.status(400).json({ 
                      type: error.original.code,
                      message: error.original.sqlMessage,
                     });
                });
        }
    });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
  }
};

const updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, username, password, role } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      await user.update({ name, username, password, role });

      res.json(user);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
  }
};

const softDeleteUser = async (req, res) => {
  try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const deletedAt = new Date();
      await user.update({ deletedAt }).then((result) => {
        // console.log(result);
        res.json({ message: 'User soft deleted successfully' });
      });

      
  } catch (error) {
      console.error('Error soft deleting user:', error);
      res.status(500).json({ error: 'Error soft deleting user' });
  }
};

const getUserRole = async (req, res) => {
  try {
      const { user_id } = req.params;
      console.log(user_id);

      // Find the user by ID
      const user = await User.findByPk(user_id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Extract the role of the user
      const { role } = user;

      res.json({ role });
  } catch (error) {
      console.error('Error retrieving user role:', error);
      res.status(500).json({ error: 'Error retrieving user role' });
  }
};

const updateUserRole = async (req, res) => {
  try {
      const { user_id } = req.params;
      const { role } = req.body;

      // Find the user by ID
      const user = await User.findByPk(user_id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Update the role of the user
      await user.update({ role });

      res.json({ message: 'User role updated successfully' });
  } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ error: 'Error updating user role' });
  }
};

module.exports = { 
  getAllUsers,
  addUser,
  updateUser,
  softDeleteUser,
  getUserRole,
  updateUserRole
};