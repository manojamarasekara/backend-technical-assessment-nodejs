// customerController.js
const Customer = require('../models/customerModel');

const getAllCustomers = async (req, res) => {
  try {
      // Query all customer records
      const customers = await Customer.findAll();

      // Return list of customers to client
      res.json({ customers });
  } catch (error) {
      console.error('Error querying customers:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const createCustomer = async (req, res) => {
    try {
        // Extract customer data from request body
        const { name, email, phone } = req.body;

        // Create new customer record
        const customer = await Customer.create({ name, email, phone });

        // Return success message and created customer record to client
        res.status(201).json({ message: 'Customer created successfully', customer });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCustomerById = async (req, res) => {
  try {
      // Extract customer ID from request parameters
      const { customer_id } = req.params;

      // Find customer by ID
      const customer = await Customer.findByPk(customer_id);

      // Check if customer exists
      if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
      }

      // Return customer details to client
      res.json({ customer });
  } catch (error) {
      console.error('Error retrieving customer:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCustomer = async (req, res) => {
  try {
      // Extract customer ID from request parameters
      const { customer_id } = req.params;

      // Extract updated customer details from request body
      const { name, email, phone } = req.body;

      // Find customer by ID
      let customer = await Customer.findByPk(customer_id);

      // Check if customer exists
      if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
      }

      // Update customer details
      customer.name = name;
      customer.email = email;
      customer.phone = phone;

      // Save updated customer to the database
      await customer.save();

      // Return success message and updated customer to client
      res.json({ message: 'Customer updated successfully', customer });
  } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

// todo implement soft delete fuction
const softDeleteCustomer = async (req, res) => {
  try {
      // Extract customer ID from request parameters
      const { customer_id } = req.params;

      // Find customer by ID
      let customer = await Customer.findByPk(customer_id);

      // Check if customer exists
      if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
      }

      // Soft delete customer by setting deletedAt field
      customer.deletedAt = new Date();
      await customer.save();

      // Return success message
      res.json({ message: 'Customer soft deleted successfully' });
  } catch (error) {
      console.error('Error soft deleting customer:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCustomer = async (req, res) => {
  try {
      // Extract customer ID from request parameters
      const { customer_id } = req.params;

      // Find customer by ID
      const customer = await Customer.findByPk(customer_id);

      // Check if customer exists
      if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
      }

      // Permanently delete customer
      await customer.destroy();

      // Return success message
      res.json({ message: 'Customer permanently deleted successfully' });
  } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { 
  getAllCustomers,
  createCustomer,
  getCustomerById,
  updateCustomer,
  softDeleteCustomer,
  deleteCustomer
};
