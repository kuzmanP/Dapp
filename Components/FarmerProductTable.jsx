import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";

const FarmerProductTable = ({ setCreateFarmerProductModel }) => {
    const { getallFarmerProductDB } = useContext(TrackingContext);
    const [allFarmerProductdata, setAllFarmerProductdata] = useState([]);

    useEffect(() => {
        const fetchFarmerProduct = async () => {
            try {
                const response = await getallFarmerProductDB();
                console.log("Farmer Product's fetched:", response); // Debug: log fetched response
                // Check if response has shipments key with an array
                if (response.farmers && Array.isArray(response.farmers)) {
                    setAllFarmerProductdata(response.farmers);
                } else {
                    throw new Error("Invalid data format received.");
                }
            } catch (error) {
                console.error("Error fetching Farmers Products:", error);
                setAllFarmerProductdata([]);
            }
        };

        fetchFarmerProduct();
    }, []);

    const convertTime = (time) => {
        const newTime = new Date(time);
        const formattedTime = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(newTime);

        return formattedTime;
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="mt-3 md:mt-0 cursor-pointer">
                    <p
                        onClick={() => setCreateFarmerProductModel(true)}
                        className="inline-block px-4 py-2 text-[#f59e0b] duration-150 font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] md:text-sm rounded-lg md:inline-flex cursor-pointer mb-4"
                    >
                        Add Farmer Product
                    </p>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left border-separate border-spacing-y-2">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Address of Farmer</th>
                            <th className="py-3 px-6">Location</th>
                            <th className="py-3 px-6">Quantity</th>
                            <th className="py-3 px-6">Price</th>
                            <th className="py-3 px-6">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {allFarmerProductdata.map((farmers) => (
                            <tr key={farmers._id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{farmers.farmerAddress}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{farmers.location} </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">${farmers.quantity}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">${farmers.price}</span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">
                                        {farmers.date ? convertTime(farmers.date) : "-"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FarmerProductTable;
