const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  profile_picture: {
    type: String,
  }, 

  preferences: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
      notification_enabled: {
        type: Boolean,
        default: true,
      },
    },
  ],

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user', // Default role is 'user'
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Skip hashing if the password is not modified
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);