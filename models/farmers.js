import mongoose from 'mongoose';
// Define the shipment schema
const farmerSchema = new mongoose.Schema({
  CBC: { type: String, required: true },
  Name: { type: String, required: true },
  Date_Created: { type: Number, required: true },
  location: { type: String, required: true },
});

let Farmer;

// Check if the Shipment model exists
if (mongoose.models && mongoose.models.Farmer) {
    Farmer = mongoose.models.Farmer;
} else {
    Farmer = mongoose.model('Farmer', farmerSchema);
}

export default Farmer;