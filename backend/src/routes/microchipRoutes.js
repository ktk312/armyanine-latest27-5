const express = require("express");
const router = express.Router();
const microchipController = require("../controllers/microchipController");

router.post('/generate', microchipController.generateMicrochips);
router.get('/getall', microchipController.getAllMicrochips);
// router.delete('/all', microchipController.deleteAllMicrochips);
router.delete('/delete/:id', microchipController.deleteMicrochipByChipId);
router.get('/getall/unassign', microchipController.getAllUnassignMicrochips);
router.patch('/:id', microchipController.updateMicrochips);



module.exports = router;
