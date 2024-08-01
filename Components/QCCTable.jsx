import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";

const QCCTable = ({ setCreateQCCModel }) => {
    const { getallQCCDB } = useContext(TrackingContext);
    const [allQCCdata, setAllQCCdata] = useState([]);

    useEffect(() => {
        const fetchQCC = async () => {
            try {
                const response = await getallQCCDB();
                console.log("QCC data fetched:", response); // Debug: log fetched response
                // Check if response has shipments key with an array
                if (response.qcc && Array.isArray(response.qcc)) {
                    setAllQCCdata(response.qcc);
                } else {
                    throw new Error("Invalid data format received.");
                }
            } catch (error) {
                console.error("Error fetching QCC data:", error);
                setAllQCCdata([]);
            }
        };

        fetchQCC();
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
                        onClick={() => setCreateQCCModel(true)}
                        className="inline-block px-4 py-2 text-[#f59e0b] duration-150 font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] md:text-sm rounded-lg md:inline-flex cursor-pointer mb-4"
                    >
                        Add QCC Details
                    </p>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left border-separate border-spacing-y-2">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">QCC </th>
                            <th className="py-3 px-6">Batch ID</th>
                            <th className="py-3 px-6">Bean Quantity</th>
                            <th className="py-3 px-6">Moisture Level</th>
                            <th className="py-3 px-6">Origin</th>
                            <th className="py-3 px-6">Inspection Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {allQCCdata.map((qcc) => (
                            <tr key={qcc._id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{qcc.QCC}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">
                                        {shipment.pickupTime ? convertTime(qcc.batch_id) : "-"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{qcc.bean_quality} </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">${qcc.moisture_level}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{qcc.origin}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{qcc.inspection_date}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QCCTable;
