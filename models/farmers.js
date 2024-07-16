import mongoose from 'mongoose';
// Define the shipment schema
const farmerSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  location: { type: String, required: true },
  farmerAddress: { type: String, required: true },
  cocoaYield: { type: Number, required: true },
  Date_Created: { type: Number, required: true },
});

let Farmer;

// Check if the Shipment model exists
if (mongoose.models && mongoose.models.Farmer) {
  Farmer = mongoose.models.Farmer;
} else {
  Farmer = mongoose.model('Farmer', farmerSchema);
}

export default Farmer;