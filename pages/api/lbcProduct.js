import { connectToDatabase } from "../../lib/mongodb";
import LBCProduct from "../../models/lbcProduct";


export default async (req, res) => {
    if (req.method == "GET") {
        try {
            await connectToDatabase();
            let lbcProducts = await LBCProduct.collection.find().toArray()
            res.status(200).json({ lbcProducts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method == "POST") {
        try {
            await connectToDatabase();
            const lbcProducts = await LBCProduct.collection.insertOne(req.body)

            res.status(201).json(lbcProducts);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
    else if (req.query.count) {
        try {
            await connectToDatabase();
            let count = await LBCProduct.collection.countDocuments({});
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};