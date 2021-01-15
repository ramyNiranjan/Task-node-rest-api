import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var TaskMessage = mongoose.model("TaskMessage", taskSchema);

export default TaskMessage;
