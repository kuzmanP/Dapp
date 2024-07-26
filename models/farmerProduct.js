import mongoose from 'mongoose';

const farmerProductSchema = new mongoose.Schema({
  farmerAddress: { type: String, required: true },
  location: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
});

let FarmerProduct;


if (mongoose.models && mongoose.models.FarmerProduct) {
    FarmerProduct = mongoose.models.FarmerProduct;
} else {
    FarmerProduct = mongoose.model('FarmerProduct', farmerProductSchema);
}

export default FarmerProduct;