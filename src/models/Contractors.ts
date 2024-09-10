import mongoose from "mongoose";

const contractorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
  },
    locality: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

  pincode: {
    type: String,
    required: [true, "Please provide a pincode"],
  },
  issue_id_file_id: {
    type: String,
    required: [true, "Please provide an issue ID file ID"],
  },
  license_file_id: {
    type: String,
    required: [true, "Please provide a license file ID"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  user_id: String
});

const Contractor =
  mongoose.models.Contractor || mongoose.model("Contractor", contractorSchema);

export default Contractor;
