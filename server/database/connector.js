import mongoose from 'mongoose';

import { MONGODB_URI } from '../config';

export default mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);