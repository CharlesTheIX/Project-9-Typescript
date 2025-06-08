import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    //auto assigned fields (_id, __v)
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide a username."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email."],
    },
    clerkId: {
      type: String,
      unique: true,
      required: [true, "Clerk ID not provided."],
    },
    profileImageUrl: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "editor", "user", "guest", "test"],
      default: "user",
    },
    profilePrivacy: {
      type: String,
      enum: ["public", "private", "contacts_only"],
      default: "private",
    },
    contacts: {
      type: [
        {
          status: {
            type: String,
            enum: ["active", "pending", "blocked", "none"],
            default: "none",
          },
          userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User id required."],
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next: any) {
  try {
    next();
  } catch (error: any) {
    console.error(`Mongo user pre save error: ${error.message}.`);
    next(error);
  }
});

const User = model("User", schema);
export default User;
