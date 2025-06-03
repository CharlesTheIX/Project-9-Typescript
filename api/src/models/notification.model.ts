
import{Schema, model} from "mongoose";

const schema = new Schema({
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

  subject: {
    type: String,
    unique: true,
    required: [true, "Please provide a subject."],
  },
  participants: {
    type: [String],
    required: [true, "Please provide an array of participants."],
  },
  readBy: {
    type: String,
    default: "none"
  },
  messages: {
    type: [{
      to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      from: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
      },
      createdAt: {
        type: Date,
        defualt: Date.now,
      },
      content: {
        type: String,
        required: [true, "Please provide the message content."]
      },
      state: {
        type: String,
        enum: ["active", "deleted"],
        default: "active"
      }
    }],
    required: [true, "Please provide an initial message chain."],
  },
  type: {
    type: String,
    enum: ["default", "message", "award"],
    default: "default",
  },
});

schema.pre("save", async function (next: any) {
  try {
    next();
  } catch (error: any) {
    console.error(`Mongo notification pre save error: ${error.message}`);
    next(error);
  }
});

const Notifican = model("Notification", schema);
export default Notifican;
