import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    //auto assigned fields (_id, __v)
    subject: {
      type: String,
      required: [true, "Please provide a subject."],
    },
    participants: {
      type: [String],
      required: [true, "Please provide an array of participants."],
    },
    readBy: {
      type: String,
      default: "none",
    },
    messages: {
      type: [
        {
          to: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the to user id."],
          },
          from: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide the from user id."],
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          content: {
            type: String,
            required: [true, "Please provide the message content."],
          },
          state: {
            type: String,
            enum: ["active", "deleted"],
            default: "active",
          },
        },
      ],
      required: [true, "Please provide an initial message chain."],
    },
    type: {
      type: String,
      enum: ["default", "message", "award", "invitation"],
      default: "default",
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next: any) {
  try {
    next();
  } catch (error: any) {
    console.error(`Mongo notification pre save error: ${error.message}`);
    next(error);
  }
});

const Notification = model("Notification", schema);
export default Notification;
