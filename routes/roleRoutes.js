const express = require('express');
const roleController = require('../controllers/roleController');
const {checkRole} = require("../middleware/roleCheckMiddleware");


const router = express.Router();

// Create a new role
router.post('/', checkRole(['Admin']), roleController.createRole);

// Get all roles
router.get('/', checkRole(['Admin']), roleController.getRoles);

// Get a single role by ID
router.get('/:id', roleController.getRole);

// Update a role by ID
router.put('/:id', checkRole(['Admin']), roleController.updateRole);

// Delete a role by ID
router.delete('/:id', checkRole(['Admin']), roleController.deleteRole);

module.exports = router;
