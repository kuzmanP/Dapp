import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";

const FarmerTable = ({ setcreateFarmerCBCModel }) => {
  const { getallFarmersDB } = useContext(TrackingContext);
  const [allFarmersdata, setAllFarmersdata] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await getallFarmersDB();
        console.log("Shipments fetched:", response); // Debug: log fetched response
        // Check if response has shipments key with an array
        if (response.farmers && Array.isArray(response.farmers)) {
            setAllFarmersdata(response.shipments);
        } else {
          throw new Error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching shipments:", error);
        setAllFarmersdata([]);
      }
    };

    fetchFarmers();
  }, [allFarmersdata]);

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
            onClick={() => setcreateFarmerCBCModel(true)}
            className="inline-block px-4 py-2 text-[#f59e0b] duration-150 font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] md:text-sm rounded-lg md:inline-flex cursor-pointer mb-4"
          >
            Add Farmer
          </p>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">CBC</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Date Added</th>
              <th className="py-3 px-6">Location</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {allFarmersdata.map((farmer) => (
              <tr key={farmer._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{farmer.CBC}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">${farmer.Name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">
                    {farmer.Date_Created ? convertTime(farmer.Date_Created) : "-"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{farmer.location}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerTable;
