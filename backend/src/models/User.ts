import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  videos: string[]; // Array of video IDs
}

const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  videos: [{
    type: String, // Store video IDs as strings
    ref: 'Video',
  }],
}, {
  timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);
