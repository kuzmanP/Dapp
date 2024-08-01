import { connectToDatabase } from "../../lib/mongodb";
import QCCProduct from "../../models/qccProduct";


export default async (req, res) => {
    if (req.method == "GET") {
        try {
            await connectToDatabase();
            let qcc = await QCCProduct.collection.find().toArray()
            res.status(200).json({ qcc });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method == "POST") {
        try {
            await connectToDatabase();
            const qcc = await QCCProduct.collection.insertOne(req.body)

            res.status(201).json(qcc);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
};