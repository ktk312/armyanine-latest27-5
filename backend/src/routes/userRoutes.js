const express = require("express");
const { register, login, getAllUsers, getUserById, updateUser, deleteUser, changePassword } = require("../controllers/userController");
const authMiddleware = require("../middleware");

const router = express.Router();

router.post("/register",authMiddleware, register);
router.post("/login", login);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/change-password",authMiddleware, changePassword);

module.exports = router;
