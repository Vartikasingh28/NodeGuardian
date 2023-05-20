const { Schema, model, Types } = require("../connection");

const userSchema = new Schema({
  title: { type: String, required: true },
  files: { type: Array, required: true },
  zipFile: String,
  dependencies: { type: Array, required: true },
  createdBy: { type: Types.ObjectId, ref: "user" },
  image: { type: String },
  created_at: Date,
  updated_at: Date,
});


module.exports = model("code", userSchema);
