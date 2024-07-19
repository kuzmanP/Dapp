import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";

const LBCTable = ({ setRegisterLBCModel }) => {
    const { getallLBCDB } = useContext(TrackingContext);
    const [allLBCdata, setAllLBCdata] = useState([]);

    useEffect(() => {
        const fetchLBC = async () => {
            try {
                const response = await getallLBCDB();
                console.log("LBC fetched:", response); // Debug: log fetched response
                // Check if response has shipments key with an array
                if (response.lbcs && Array.isArray(response.lbcs)) {
                    setAllLBCdata(response.lbcs);
                } else {
                    throw new Error("Invalid data format received.");
                }
            } catch (error) {
                console.error("Error fetching farmers:", error);
                setAllLBCdata([]);
            }
        };

        fetchLBC();
    }, []); // Remove allFarmersdata from the dependency array

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
                        onClick={() => setRegisterLBCModel(true)}
                        className="inline-block px-4 py-2 text-[#f59e0b] duration-150 font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] md:text-sm rounded-lg md:inline-flex cursor-pointer mb-4"
                    >
                        Add LBC
                    </p>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left border-separate border-spacing-y-2">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>

                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Location</th>
                            <th className="py-3 px-6">LBC Address</th>
                            <th className="py-3 px-6">Date Created</th>


                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {allLBCdata.map((lbcs) => (
                            <tr key={lbcs._id} className="hover:bg-gray-100">

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{lbcs.Name}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{lbcs.location}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">{lbcs.address}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-gray-900">
                                        {lbcs.Date_Created ? convertTime(lbcs.Date_Created) : "-"}
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

export default LBCTable;
