const express = require("express");
const router = express.Router();
const studCertificateController = require("../controllers/studCertificationController");

// Create a new stud certificate
router.post("/", studCertificateController.createStudCertificate);

// Get all stud certificates
router.get("/", studCertificateController.getAllStudCertificates);

// Get a single stud certificate by ID
router.get("/:id", studCertificateController.getStudCertificateById);

// Update a stud certificate
router.put("/:id", studCertificateController.updateStudCertificate);

// Delete a stud certificate
router.delete("/:id", studCertificateController.deleteStudCertificate);

// Search a stud certificate
router.get("/search/stud-certificate", studCertificateController.searchStudCertificates);

router.post('/upto/fifth/generation', studCertificateController.checkUptoFifth);

//Check virtual Breeding
router.post('/virtual/breeding', studCertificateController.virtualBreedingCheck);
module.exports = router;
