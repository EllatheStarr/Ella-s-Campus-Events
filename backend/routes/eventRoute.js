const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Create a new event
router.post('/', eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Get a single event by ID
router.get('/:id', eventController.getEventById);

// Update an event
router.put('/events/:id', eventController.updateEvent);

// Delete an event
router.delete('/events/:id', eventController.deleteEvent);

// Update individual fields
router.patch('/events/:id/:field', eventController.updateEventField);

module.exports = router;