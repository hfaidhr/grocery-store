const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/register", UserController.createUser);
router.patch("/users/:userId", UserController.updateUser);
router.post("/login", UserController.loginUser);
router.post("/refresh-token", UserController.refreshToken);
router.post("/logout/:userId", UserController.logout);
module.exports = router;
