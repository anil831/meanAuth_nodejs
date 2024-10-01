const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
const {checkRole} = require("../middleware/roleCheckMiddleware");

router.post('/create', authenticateToken,checkRole(["Admin"]) , userController.createUser);
router.get('/', authenticateToken, userController.getUsers);

module.exports = router;
