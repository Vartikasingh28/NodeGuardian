const { Schema, model, Types } = require("../connection");

const userSchema = new Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});


module.exports = model("contact", userSchema);
