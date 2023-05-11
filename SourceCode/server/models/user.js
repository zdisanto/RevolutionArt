import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: {type: String, required: false },
  username: {type: String, required: false},
  id: { type: String },
  stripeCustomerId: { type: String},
  subscriptionInfo : {type: Object, required: false}
});

export default mongoose.model("User", userSchema);