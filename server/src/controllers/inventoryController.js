const Medication = require('../models/medicationModel');

const getMedications = async (req, res) => {
    try {
        const medications = await Medication.findAll();

        const medicationData = medications.map(medication => {
            return {
              id: medication.id,
              name: medication.name,
              description: medication.description,
              quantity: medication.quantity
            };
          });
 
        res.status(200).json({
            success: true,
            message: "Successfully retrieved medication data",
            data: medicationData
          });
    } catch (error) {
        console.error('Error querying medicines:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
         });
    }
};

const addMedication = async (req, res) => {
    try {
        const { name, description, quantity } = req.body;

        const medication = await Medication.create({ name, description, quantity });

        res.status(201).json({ 
            success: true,
            message: 'Medication created successfully', 
            data: {
                name: medication.name,
                description: medication.description,
                quantity: medication.quantity
            }
        });
    } catch (error) {
        console.error('Error creating medication:', error);
        res.status(500).json({ 
            success: false,
            error: 'Error creating medication',
            message: error.message
        });
    }
};

const getMedicationById = async (req, res) => {
    try {
        const { medication_id } = req.params;

        const medication = await Medication.findByPk(medication_id);

        if (!medication) {
            return res.status(404).json({ 
                success: false,
                error: 'Medication not found',
                message: "The medication you are trying to access does not exist in the system. Please make sure you have provided the correct medication ID."
            });
        }

        // Return medication details to client
        res.status(200).json({
            success: true,
            message: 'Medication details available',
            data: {
                name: medication.name,
                description: medication.description,
                quantity: medication.quantity
            }
        });
    } catch (error) {
        console.error('Error retrieving medication:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};

const updateMedication = async (req, res) => {
    try {
        const { medication_id } = req.params;

        const { name, description, quantity } = req.body;

        let medication = await Medication.findByPk(medication_id);

        if (!medication) {
            return res.status(404).json({ 
                success: false,
                error: 'Medication not found',
                message: "The medication you are trying to access does not exist in the system. Please make sure you have provided the correct medication ID."
            });
        }

        medication.name = name;
        medication.description = description;
        medication.quantity = quantity;

        medication = await medication.save();

        // Return success message and updated medication to client
        res.json({ 
            success: true,
            message: 'Medication updated successfully', 
            data: {
                name: medication.name,
                description: medication.description,
                quantity: medication.quantity
            }
        });
    } catch (error) {
        console.error('Error updating medication:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};

// todo: please implement this method
const softDeleteMedication = async (req, res) => {
    try {
        // Extract medication ID from request parameters
        const { medication_id } = req.params;

        // Find medication by ID
        let medication = await Medication.findByPk(medication_id);

        // Check if medication exists
        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        // Soft delete medication by setting deletedAt field
        await medication.save().then((result) => {
            // console.log(result);
            res.json({ message: 'User soft deleted successfully' });
          });

        // Return success message
        res.json({ message: 'Medication soft deleted successfully' });
    } catch (error) {
        console.error('Error soft deleting medication:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};

const deleteMedication = async (req, res) => {
    try {
        const { medication_id } = req.params;

        const medication = await Medication.findByPk(medication_id);

        if (!medication) {
            return res.status(404).json({ 
                success: false,
                error: 'Medication not found',
                message: "The medication you are trying to access does not exist in the system. Please make sure you have provided the correct medication ID."
            });
        }

        await medication.destroy();

        res.json({ 
            success: true,
            message: 'Medication permanently deleted',
            data: {
                name: medication.name,
                description: medication.description,
                quantity: medication.quantity
            }
        });
    } catch (error) {
        console.error('Error deleting medication:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};

const adjustMedicationQuantity = async (req, res) => {
    try {
        const { medication_id } = req.params;

        const { adjustment } = req.body;

        let medication = await Medication.findByPk(medication_id);

        if (!medication) {
            return res.status(404).json({ 
                success: false,
                error: 'Medication not found',
                message: "The medication you are trying to access does not exist in the system. Please make sure you have provided the correct medication ID."
            });
        }

        medication.quantity = adjustment;

        await medication.save();

        res.json({ 
            success: true,
            message: 'Medication quantity adjusted successfully',
            data: {
                name: medication.name,
                description: medication.description,
                quantity: medication.quantity
            }
        });
    } catch (error) {
        console.error('Error adjusting medication quantity:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
};

module.exports = { 
    getMedications,
    addMedication,
    getMedicationById,
    updateMedication,
    softDeleteMedication,
    deleteMedication,
    adjustMedicationQuantity
 };
