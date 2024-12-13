const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event', // Reference to the Event model
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now, // The timestamp when the RSVP was created
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const RSVP = mongoose.model('RSVP', rsvpSchema);

module.exports = RSVP;