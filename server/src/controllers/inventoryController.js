const Medication = require('../models/medicationModel');

const getMedications = async (req, res) => {
    try {
        const medications = await Medication.findAll();
 
        res.json({ medications });
    } catch (error) {
        console.error('Error querying medicines:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addMedication = async (req, res) => {
    try {
        // Extract medication data from request body
        const { name, description, quantity } = req.body;

        // Create new medication record
        const medication = await Medication.create({ name, description, quantity });

        // Return success message and created medication record to client
        res.status(201).json({ message: 'Medication created successfully', medication });
    } catch (error) {
        console.error('Error creating medication:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMedicationById = async (req, res) => {
    try {
        // Extract medication ID from request parameters
        const { medication_id } = req.params;

        // Find medication by ID
        const medication = await Medication.findByPk(medication_id);

        // Check if medication exists
        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        // Return medication details to client
        res.json({ medication });
    } catch (error) {
        console.error('Error retrieving medication:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateMedication = async (req, res) => {
    try {
        // Extract medication ID from request parameters
        const { medication_id } = req.params;

        // Extract updated medication details from request body
        const { name, description, quantity } = req.body;

        // Find medication by ID
        let medication = await Medication.findByPk(medication_id);

        // Check if medication exists
        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        // Update medication details
        medication.name = name;
        medication.description = description;
        medication.quantity = quantity;

        // Save updated medication to the database
        medication = await medication.save();

        // Return success message and updated medication to client
        res.json({ message: 'Medication updated successfully', medication });
    } catch (error) {
        console.error('Error updating medication:', error);
        res.status(500).json({ error: 'Internal server error' });
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
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteMedication = async (req, res) => {
    try {
        // Extract medication ID from request parameters
        const { medication_id } = req.params;

        // Find medication by ID
        const medication = await Medication.findByPk(medication_id);

        // Check if medication exists
        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        // Permanently delete medication
        await medication.destroy();

        // Return success message
        res.json({ message: 'Medication permanently deleted successfully' });
    } catch (error) {
        console.error('Error deleting medication:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const adjustMedicationQuantity = async (req, res) => {
    try {
        // Extract medication ID from request parameters
        const { medication_id } = req.params;

        // Extract quantity adjustment from request body
        const { adjustment } = req.body;

        // Find medication by ID
        let medication = await Medication.findByPk(medication_id);

        // Check if medication exists
        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        // Adjust medication quantity
        medication.quantity = adjustment;

        // Save updated medication to the database
        await medication.save();

        // Return success message and updated medication to client
        res.json({ message: 'Medication quantity adjusted successfully', medication });
    } catch (error) {
        console.error('Error adjusting medication quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
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
