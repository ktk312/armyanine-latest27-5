const express = require("express");
const router = express.Router();
const dogController = require("../controllers/dogController");
const upload = require("../config/multerConfig");

// Create a new dog
router.post("/", upload.single('file'), dogController.createDog);

// Get all dogs
router.get("/", dogController.getAllDogs);
//get all dogs count
// Get all dogs count
router.get("/totalDogs/count", dogController.getDogsCount);

// Get a single dog by ID
router.get("/:id", dogController.getDogById);

// Update a dog
router.patch("/:id", upload.single('file'), dogController.updateDog);

// Delete a dog
router.delete("/:id", dogController.deleteDog);

// Get Dog using breedID
router.get("/breed/:breedId", dogController.getDogsByBreed);
//Get ALl Sire and Dam
router.get("/parent/all", dogController.getAllParent);

// Create Dog category
router.post("/create/category", dogController.dogCategoryCreate);
router.patch("/update/category/:id", dogController.dogCategoryUpdate);

// Get All dog category
router.get("/category/all", dogController.getAllDogsCategory);


// Get All germanShepherdList
router.get("/:id/details", dogController.getDogDetails);

router.get("/siblings/:id", dogController.getDogSiblings);

// Get ALL FIFTH Generation Pidegree Tree
router.get("/pedigree/:id", dogController.getDogPedigree);
router.get("/progeny/:id", dogController.getDogProgeny);


// dog madule apis
router.get("/germanshepherd/view", dogController.germanShepherdList);
// Get All bullDogsList

router.get("/bulldogs/view", dogController.bullDogsList);

// Get All LabradorRetreiverList
router.get("/labrador-retriever/view", dogController.labradorRetreiverList);

// Get All standing dogs List
router.get("/standing/view", dogController.standingDogList);

router.get("/cnd/view", dogController.cndDogList);
router.get("/cns/view", dogController.cnsDogList);

// Get All belgian dogs List
router.get("/belgian/view", dogController.belgianDogList);

// Get All sold dogs List
router.get("/list/sold/view", dogController.soldDogList);

// Get All sold dogs List
router.get("/loan/view", dogController.loanDogList);

// Get All transferred dogs List
router.get("/transferred/view", dogController.transferredDogList);

// Get All Dead dogs List
router.get("/dead/view", dogController.deadDogList);

// seacrch dog by location or breed 
router.get("/filter/view", dogController.getFilteredDogs);

module.exports = router;
