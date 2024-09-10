import mongoose from "mongoose";

const departmentalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  pass: {
    type: String,
    required: [true, "Please provide a password"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  dept_level: {
    type: String,
    enum: ["State", "Local"],
    required: [true, "Please specify the department level"],
  },
  role: {
    type: String,
    enum: ["Technical", "Head"],
    required: [true, "Please specify the role"],
  },
  emp_no: {
    type: String,
    required: [true, "Please provide an employee number"],
  },
  location: {
    type: String,
    required: [true, "Please provide the location"],
  },
  office_address: {
    type: String,
    required: [true, "Please provide the office address"],
  },
  pin_code: {
    type: String,
    required: [true, "Please provide a pin code"],
  },
  govt_issue_id_file_id: {
    type: String,
    required: [true, "Please provide a government issue ID file ID"],
  },
  authorisation_file_id: {
    type: String,
    required: [true, "Please provide an authorization file ID"],
  },
  prev_project_file_id: {
    type: String,
    required: false, // Optional field
  },
  verified: {
    type: Boolean,
    default: false,
  },
  user_id: String
});

const Departmental =
  mongoose.models.Departmental || mongoose.model("Departmental", departmentalSchema);

export default Departmental;