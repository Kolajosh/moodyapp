import { Schema, model, models } from "mongoose";

const MoodSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mood: {
    type: String,
    required: [true, "Mood is required."],
  },
  emotion: {
    type: String,
    required: [true, "Emotion is required"],
  },
  emotionIconUnicode: {
    type: String,
    required: [true, "required"],
  },
  note: {
    type: String,
  },
  timeStamp: {
    type: Date,
    required: [true, "Date is required"],
  },
});

const Moods = models.Moods || model("Moods", MoodSchema);

export default Moods;
