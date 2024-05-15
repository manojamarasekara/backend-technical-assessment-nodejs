const Customer = require('../models/customerModel');

const getAllCustomers = async (req, res) => {
  try {
      const customers = await Customer.findAll();

      const customersData = customers.map(customer => {
        return {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone
        };
      });

      // Return list of customers to client
      res.status(200).json({
        success: true,
        message: "Successfully retrieved customers data",
        data: customersData
    });
  } catch (error) {
        console.error('Error querying customers:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};

const createCustomer = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const customer = await Customer.create({ name, email, phone });

        res.status(201).json({
            success: true,
            message: 'Customer created successfully', 
            data: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone
            }
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};

const getCustomerById = async (req, res) => {
  try {
      const { customer_id } = req.params;

      const customer = await Customer.findByPk(customer_id);

      if (!customer) {
        return res.status(404).json({ 
            success: false,
            error: 'Customer not found',
            message: "The customer you are trying to access does not exist in the system. Please make sure you have provided the correct customer ID."
        });
      }

        res.json({ 
            success: true,
            message: 'Customer details available',
            data: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone
            }
        });
  } catch (error) {
      console.error('Error retrieving customer:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
     });
  }
};

const updateCustomer = async (req, res) => {
  try {
      const { customer_id } = req.params;

      const { name, email, phone } = req.body;

      let customer = await Customer.findByPk(customer_id);

      if (!customer) {
        return res.status(404).json({ 
            success: false,
            error: 'Customer not found',
            message: "The customer you are trying to access does not exist in the system. Please make sure you have provided the correct customer ID."
        });
      }

      customer.name = name;
      customer.email = email;
      customer.phone = phone;

      await customer.save();

      res.json({
        success: true,
        message: 'Customer updated successfully', 
        data: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone
        }
    });
  } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
     });
  }
};

// todo implement soft delete fuction
const softDeleteCustomer = async (req, res) => {
  try {
      const { customer_id } = req.params;

      let customer = await Customer.findByPk(customer_id);

      if (!customer) {
        return res.status(404).json({ 
            success: false,
            error: 'Customer not found',
            message: "The customer you are trying to access does not exist in the system. Please make sure you have provided the correct customer ID."
        });
      }

      customer.deletedAt = new Date();
      await customer.save();

      // Return success message
      res.json({ message: 'Customer soft deleted successfully' });
  } catch (error) {
      console.error('Error soft deleting customer:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
     });
  }
};

const deleteCustomer = async (req, res) => {
  try {
      const { customer_id } = req.params;

      const customer = await Customer.findByPk(customer_id);

      if (!customer) {
        return res.status(404).json({ 
            success: false,
            error: 'Customer not found',
            message: "The customer you are trying to access does not exist in the system. Please make sure you have provided the correct customer ID."
        });
      }

      await customer.destroy();
      res.json({ 
        success: true,
        message: 'Customer permanently deleted',
        data: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone
        }
    });
  } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
     });
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
