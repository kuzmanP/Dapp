import mongoose from 'mongoose';
// Define the shipment schema
const shipmentSchema = new mongoose.Schema({
  receiver: { type: String, required: true },
  pickupTime: { type: String, required: true },
  distance: { type: Number, required: true },
  price: { type: Number, required: true },
  transactionHash: { type: String, required: true },
  isPaid: { type: Boolean, required: true },
  status: { type: String, required: true }
});

let Shipment;

// Check if the Shipment model exists
if (mongoose.models && mongoose.models.Shipment) {
  Shipment = mongoose.models.Shipment;
} else {
  Shipment = mongoose.model('Shipment', shipmentSchema);
}

export default Shipment;