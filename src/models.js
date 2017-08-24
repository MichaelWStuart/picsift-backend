import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   profileId: String,
//   token: String,
// });

const photoSchema = mongoose.Schema({
  name: String,
  tags: Array,
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
})

// export const User = mongoose.model('User', userSchema);
export const Photo = mongoose.model('Photo', photoSchema);
