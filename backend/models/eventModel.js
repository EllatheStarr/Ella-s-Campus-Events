const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to the category
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the creator
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
  capacity: { type: Number, required: true }, // Maximum number of attendees
  available_seats: { type: Number, required: true }, // Remaining seats
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users who RSVP'd
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Pre-save hook to ensure available seats does not exceed capacity
EventSchema.pre('save', function (next) {
  if (this.isModified('capacity') && this.attendees.length > this.capacity) {
    return next(new Error('Attendees exceed the event capacity'));
  }
  this.available_seats = this.capacity - this.attendees.length;
  next();
});

module.exports = mongoose.model('Event', EventSchema);
