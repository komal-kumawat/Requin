import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // added 'unique' for good practice
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user", "manager"], default: "user" },
});

const User = mongoose.model("User", userSchema);

export default User;
