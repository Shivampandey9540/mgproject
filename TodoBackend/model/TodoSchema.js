const mongoose = require("mongoose");

const Todo = mongoose.Schema({
  Title: {
    type: String,
    unique: true,
    required: [true, "Requied"],
  },
  tasks: {
    type: [{ task: { type: String, trim: true } }],
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  isimportant: {
    type: Boolean,
    default: false,
  },
  Check: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", Todo);
