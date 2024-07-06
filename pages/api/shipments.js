import { connectToDatabase } from "../../lib/mongodb";
import Shipment from "../../models/shipment";


export default async (req, res) => {
    if (req.method == "GET") {
        try {
            await connectToDatabase();
            let shipments = await Shipment.collection.find().toArray()
            res.status(200).json({ shipments });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method == "POST") {
        try {
            await connectToDatabase();
            const shipment = await Shipment.collection.insertOne(req.body)

            res.status(201).json(shipment);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
};