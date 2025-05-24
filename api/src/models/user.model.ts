import mongoose from "mongoose";

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

  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide and email."],
  },
  clerkId: {
    type: String,
    unique: true,
    required: [true, "Clerk ID not provided."],
  },
  firstName: {
    type: String,
    required: [true, "Please provide a first name."],
  },
  surname: {
    type: String,
    required: [true, "Please provide a surname."],
  },
  profileImageURL: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["admin", "editor", "user", "guest", "test"],
    default: "user",
  },
});

schema.pre("save", async function (next: any) {
  try {
    next();
  } catch (error: any) {
    console.error(`Mongo user pre save error: ${error.message}.`);
    next(error);
  }
});

const User = mongoose.model("User", schema);
export default User;
