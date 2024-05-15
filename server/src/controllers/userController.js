// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Implement controller methods for user operations
const getAllUsers = async (req, res) => {
  try {
      const users = await User.findAll();

      const usersData = users.map(user => {
        return {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role
        };
      });

      res.status(200).json({
        success: true,
        message: "Successfully retrieved user data",
        data: usersData
      });
  } catch (error) {
      console.error('Error querying users:', error);
      res.status(500).json({ 
        success: false,
        error: 'Internal server error',
        message: error.message
      });
  }
};

const addUser = async (req, res) => {
  try {
      const { name, username, password, role } = req.body;
      
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            // Handle error
            res.status(400).json({ 
              success: false,
              error: 'Error creating user',
              message: err.message
            });
        } else {
            // Store the hashed password in the database
            User.create({ name, username, password: hash, role })
                .then(user => {
                    // User created successfully
                    res.status(201).json({ 
                      success: true,
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
                      success: false,
                      type: error.original.code,
                      message: error.original.sqlMessage,
                     });
                });
        }
    });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error creating user',
        message: error.message
      });
  }
};

const updateUser = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, username, password, role } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({
            success: false,
            error: 'User not found',
            message: 'The user you are trying to access does not exist in the system. Please make sure you have provided the correct user ID.'
          });
      }

      await user.update({ name, username, password, role });
      
      res.status(200).json({
        success: true,
        message: 'User details successfully updated.',
        data: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role
        }
      });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error updating user',
        message: error.message
      });
  }
};

const softDeleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      console.log(id);

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          message: 'The user you are trying to access does not exist in the system. Please make sure you have provided the correct user ID.'
        });
      }

      const deletedAt = new Date();
      await user.update({ deletedAt }).then((result) => {
        res.status(200).json({ 
          success: true,
          message: 'User has been successfully marked as deleted. This action soft deletes the user from the system.'
        });
      });

      
  } catch (error) {
      console.error('Error soft deleting user:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error soft deleting user',
        message: error.message
      });
  }
};

const deleteUser = async (req, res) => {
  try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          message: 'The user you are trying to access does not exist in the system. Please make sure you have provided the correct user ID.'
        });
      }

      await user.destroy();

      res.json({ 
        success: true,
        message: 'User permanently deleted',
        data: {
          data: {
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role
          }
        }
      });
  } catch (error) {
      console.error('Error permanently deleting user:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error permanently deleting user',
        message: error.message
      });
  }
};

const getUserRole = async (req, res) => {
  try {
      const { user_id } = req.params;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          message: 'The user you are trying to access does not exist in the system. Please make sure you have provided the correct user ID.'
        });
      }

      const { role } = user;

      res.status(200).json({ 
        success: true,
        message: `User role found for user ${user.name} in system`,
        data: { role }
      });
  } catch (error) {
      console.error('Error retrieving user role:', error);
      res.status(500).json({ 
        success: true,
        error: 'Error retrieving user role',
        message: error.message
      });
  }
};

const updateUserRole = async (req, res) => {
  try {
      const { user_id } = req.params;
      const { role } = req.body;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          message: 'The user you are trying to access does not exist in the system. Please make sure you have provided the correct user ID.'
        });
      }

      await user.update({ role });

      res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data:{
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role
        }
      });
  } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ 
        success: false,
        error: 'Error updating user role',
        message: error.message
      });
  }
};

module.exports = { 
  getAllUsers,
  addUser,
  updateUser,
  softDeleteUser,
  deleteUser,
  getUserRole,
  updateUserRole
};