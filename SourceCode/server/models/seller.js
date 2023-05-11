import mongoose from 'mongoose';

const sellerSchema = mongoose.Schema({
    name: { type: String, required: true},
    gallery_name: { type: String, required: false},
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    stripeCustomerId: { type: String},
    subscriptionInfo : {type: Object, required: false}
})

export default mongoose.model("Seller", sellerSchema);
