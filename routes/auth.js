const express = require("express");
const {
    registerUser,
    loginUser,
    getAllUsersController,
    authToken,
    logOutUser,
} = require("../controllers/auth");
const { verifyToken } = require("../midlewares/jwt");

const router = express.Router();

router.get("/", verifyToken, authToken);
router.get("/users", getAllUsersController);
router.get("/logout", logOutUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
