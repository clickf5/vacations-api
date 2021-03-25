import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role: {
    type: [String],
    default: ['ROLE_USER'],
  },
  approved: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false });

export default mongoose.model('users', userSchema);
