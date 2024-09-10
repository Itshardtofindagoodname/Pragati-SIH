import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },

  phone: {
    type: String,
    required: [true, "Please provide a phonenumber"],
  },

  pin: {
    type: String,
    required: [true, "Please provide your pincode"],
  },

  problem: {
    type: String,
    required: [true, "Please describe your problem"],
  },

  attachment_id: String,
});

const Complaint =
  mongoose.models.complaints || mongoose.model("complaints", complaintSchema);

export default Complaint;
