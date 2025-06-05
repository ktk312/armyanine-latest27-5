const express = require("express");
const { createVaccinationRecord, 
    deleteVaccinationRecord, 
    getAllVaccinationRecords, 
    getVaccinationRecordById, 
    updateVaccinationRecord } = require('../controllers/vaccinationController.js');


const router = express.Router();

router.post('/', createVaccinationRecord);
router.get('/', getAllVaccinationRecords);
router.get('/:id', getVaccinationRecordById);
router.patch('/:id', updateVaccinationRecord);
router.delete('/:id', deleteVaccinationRecord);

module.exports = router;
