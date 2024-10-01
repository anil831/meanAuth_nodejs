const express = require('express');
const screenAccessController = require('../controllers/screenAccessController');
const {checkRole} = require("../middleware/roleCheckMiddleware");

const router = express.Router();

// Create RoleAccess
router.post('/', checkRole(['Admin']), screenAccessController.createOrUpdateScreenAccess);

// Get all RoleAccess entries
router.get('/', checkRole(['Admin']), screenAccessController.getAllScreenAccess);

// Get a specific RoleAccess entry by ID
router.get('/:id', screenAccessController.getScreenAccessById);

router.get('/role/:id', screenAccessController.getScreenAccessByRole);


// Update RoleAccess
router.put('/:id', checkRole(['Admin']), screenAccessController.updateScreenAccess);

router.put('/role/:id', checkRole(['Admin']), screenAccessController.updateScreenAccessByRole);


// Delete RoleAccess
router.delete('/:id', checkRole(['Admin']), screenAccessController.deleteScreenAccess);

module.exports = router;
