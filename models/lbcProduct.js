import mongoose from 'mongoose';

const lbcProductSchema = new mongoose.Schema({
    lbcAddress: { type: String, required: true },
    farmerAddress: { type: String, required: true },
    location: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
});

let LBCProduct;


if (mongoose.models && mongoose.models.LBCProduct) {
    LBCProduct = mongoose.models.LBCProduct;
} else {
    LBCProduct = mongoose.model('LBCProduct', lbcProductSchema);
}

export default LBCProduct;