import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    //auto assigned fields (_id, __v)

    displayName: {
      type: String,
      unique: true,
      required: [true, "Please provide a display name."],
    },
    names: {
      type: [String],
      required: [true, "Please provide an array of names."],
    },
    continent: {
      type: String,
      enum: ["Europe", "Asia", "Africa", "Oceania", "North America", "South America"],
      required: [true, "Please provide a continent."],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    capitalCity: {
      type: String,
      default: "",
    },
    languages: {
      type: [String],
      default: [],
    },
    population: {
      type: Number,
      default: 0,
    },
    flagRectangle: {
      type: {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
      },
      required: [true, "Please provide a flag rectangle object."],
    },
    mapRectangle: {
      type: {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
      },
      required: [true, "Please provide a map rectangle object."],
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next: any) {
  try {
    next();
  } catch (error: any) {
    console.error(`Mongo country pre save error: ${error.message}`);
    next(error);
  }
});

// Example code snippet for custom Mongo schema method
// schema.statics.CUSTOM_FUNCTION = async function (props: any) {
//   try {
//     // CUSTOM CODE HERE
//   } catch (error: any) {
//     console.error(`CUSTOM FUNCTION error: ${error.message}`);
//     throw Error(error.message);
//   }
// };

const Country = model("Country", schema);
export default Country;
