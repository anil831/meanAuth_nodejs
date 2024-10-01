const express = require('express');
const router = express.Router();
const screenController = require('../controllers/screenController');
const authenticateToken = require('../middleware/authMiddleware');
const {checkRole} = require("../middleware/roleCheckMiddleware");


router.post('/', checkRole(['Admin']),screenController.createScreen);
router.put('/:id', checkRole(['Admin']), screenController.updateScreen);
router.get('/', screenController.getScreens);
router.get('/:id', screenController.getScreen);
router.delete('/:id', checkRole(['Admin']), screenController.deleteScreen);

module.exports = router;
