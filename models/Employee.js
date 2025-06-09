const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: { type: Number, required: true, unique: true },
  fristName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  hireDate: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
