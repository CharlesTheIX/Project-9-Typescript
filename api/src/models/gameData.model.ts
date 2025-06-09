import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    //auto assigned fields (_id, __v)
    gameType: {
      type: String,
      enum: ["countries_memory"],
      required: [true, "Please provide a gameType."],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a userId."],
    },
    score: {
      type: Number,
      required: [true, "Please provide a score."],
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next: any) {
  try {
    next();
  } catch (error: any) {
    console.error(`Mongo gameData pre save error: ${error.message}`);
    next(error);
  }
});

const GameData = model("GameData", schema);
export default GameData;
