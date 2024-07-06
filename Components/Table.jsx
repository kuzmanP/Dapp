import React, { useState, useEffect, useContext } from "react";
import { TrackingContext } from "../Conetxt/TrackingContext";

const ShipmentTable = ({ setCreateShipmentModel }) => {
  const { getallShipmentDB } = useContext(TrackingContext);
  const [allShipmentsdata, setAllShipmentsdata] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await getallShipmentDB();
        console.log("Shipments fetched:", response); // Debug: log fetched response
        // Check if response has shipments key with an array
        if (response.shipments && Array.isArray(response.shipments)) {
          setAllShipmentsdata(response.shipments);
        } else {
          throw new Error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching shipments:", error);
        setAllShipmentsdata([]);
      }
    };

    fetchShipments();
  }, [getallShipmentDB]);

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
            onClick={() => setCreateShipmentModel(true)}
            className="inline-block px-4 py-2 text-[#f59e0b] duration-150 font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] md:text-sm rounded-lg md:inline-flex cursor-pointer"
          >
            Add Product
          </p>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left border-separate border-spacing-y-2">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Receiver</th>
              <th className="py-3 px-6">Pickup Time</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Paid</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {allShipmentsdata.map((shipment) => (
              <tr key={shipment._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{shipment.receiver}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">
                    {shipment.pickupTime ? convertTime(shipment.pickupTime) : "-"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{shipment.distance} Km</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">${shipment.price}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-${shipment.isPaid ? "green-600" : "red-600"}`}>
                    {shipment.isPaid ? "Paid" : "Not Paid"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-${shipment.status.toLowerCase() === "complete" ? "green-600" : "yellow-600"}`}>
                    {shipment.status}
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

export default ShipmentTable;
