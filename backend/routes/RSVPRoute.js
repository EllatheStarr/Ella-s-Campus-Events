const express = require('express');
const RSVPController = require('../controllers/RSVPController.js');

const router = express.Router();

// Create a new RSVP
router.post('/', RSVPController.createRSVP);

// Get all RSVPs
router.get('/', RSVPController.getAllRSVPs);

// Get a single RSVP by ID
router.get('/:id', RSVPController.getRSVPById);

// Update an RSVP
router.put('/:id', RSVPController.updateRSVP);

// Delete an RSVP
router.delete('/:id', RSVPController.deleteRSVP);

module.exports = router;