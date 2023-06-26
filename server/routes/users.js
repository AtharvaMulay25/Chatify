const express = require("express")
const router = express.Router();
const user = require('../controllers/user')

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/setAvatar/:id", user.setAvatar)
router.get("/allUsers/:id", user.getAllUsers)

module.exports = router;