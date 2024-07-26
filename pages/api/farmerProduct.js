import { connectToDatabase } from "../../lib/mongodb";
import FarmerProduct from "../../models/farmerProduct";


export default async (req, res) => {
    if (req.method == "GET") {
        try {
            await connectToDatabase();
            let farmers = await FarmerProduct.collection.find().toArray()
            res.status(200).json({ farmers });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method == "POST") {
        try {
            await connectToDatabase();
            const farmers = await FarmerProduct.collection.insertOne(req.body)

            res.status(201).json(farmers);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
};