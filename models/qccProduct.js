import mongoose from 'mongoose';

const QCCProductSchema = new mongoose.Schema({
    QCC: { type: String, required: true },
    batch_id: { type: Number, required: true },
    bean_quality: { type: String, required: true },
    moisture_level: { type: String, required: true },
    origin: { type: String, required: true },
    inspection_date: { type: String, required: true },
});

let QCCProduct;


if (mongoose.models && mongoose.models.QCCProduct) {
    QCCProduct = mongoose.models.QCCProduct;
} else {
    QCCProduct = mongoose.model('QCCProduct', QCCProductSchema);
}

export default QCCProduct;