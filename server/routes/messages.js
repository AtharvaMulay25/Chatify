const express = require("express")
const router = express.Router();
const message = require('../controllers/message')

router.post("/sendMsg", message.addMessage);
router.post("/getAllMsg", message.getAllMessages);


module.exports = router;