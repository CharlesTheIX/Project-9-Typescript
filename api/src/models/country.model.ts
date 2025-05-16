import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  //auto assigned fields
  // _id
  //__v

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  displayName: {
    type: String,
    required: [true, 'Please provide a display name.'],
  },
  names: {
    type: [String],
    required: [true, 'Please provide an array of names.'],
  },
  continent: {
    type: String,
    required: [true, 'Please provide a continent.'],
  },
  flagRectangle: {
    type: {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
    },
    required: [true, 'Please provide a flag rectangle object.'],
  },
  mapRectangle: {
    type: {
      x: Number,
      y: Number,
      width: Number,
      height: Number,
    },
    required: [true, 'Please provide a map rectangle object.'],
  },
});

schema.pre('save', async function (next: any) {
  try {
    next();
  } catch (error: any) {
    console.error(`Mongo user pre save error: ${error.message}`);
    next(error);
  }
});

const Country = mongoose.model('Country', schema);
export default Country;
