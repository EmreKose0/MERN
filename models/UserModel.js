import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastname",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

UserSchema.methods.toJson = function () {
  //user i elde ettigimizde psw bilgilerini silerek yolluyoruz
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
export default mongoose.model("User", UserSchema);
