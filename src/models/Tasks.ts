import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  locality: {
    type: String,
    required: [true, "Please provide a locality"],
  },
  work_type: {
    type: String,
    required: [true, "Please specify the work type"],
  },
  department_level: {
    type: String,
    enum: ["State", "Local"],
    required: [true, "Please specify the department level"],
  },
  start_date: {
    type: Date,
    required: [true, "Please provide a start date"],
  },
  end_date: {
    type: Date,
    required: [true, "Please provide an end date"],
  },
  head_ids: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "departmentals", // Reference to the Departmental model
    required: [true, "Please provide head IDs"],
  },
  resources: {
    type: [String],
    required: [true, "Please provide resources"],
  },
});

const Task =
  mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
