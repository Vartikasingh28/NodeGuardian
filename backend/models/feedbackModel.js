const { Schema, model, Types } = require("../connection");

const userSchema = new Schema({
  rating: String,
  feedback: String
});


module.exports = model("feedback", userSchema);
