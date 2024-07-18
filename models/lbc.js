import mongoose from 'mongoose';
// Define the shipment schema
const lbcSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    location: { type: String, required: true },
    lbcAddress: { type: String, required: true },
    Date_Created: { type: Number, required: true },
});

let LBC;

// Check if the Shipment model exists
if (mongoose.models && mongoose.models.LBC) {
    LBC = mongoose.models.LBC;
} else {
    LBC = mongoose.model('LBC', lbcSchema);
}

export default LBC;