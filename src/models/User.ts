import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    minlength: [3, "Username can't be less than 3 chars"],
    maxlength: [40, "Username can't be more than 40 chars"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "first name can't be less than 3 chars"],
    maxlength: [55, "first name can't be more than 55 chars"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    maxlength: [55, "last name can't be more than 55 chars"],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
