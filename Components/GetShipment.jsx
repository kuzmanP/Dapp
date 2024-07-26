import { useState, useEffect } from "react";
import axios from "axios";

export default ({ getModel, setGetModel, getShipment }) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();

  const getallSingleShipmentDB = async (transactionHash) => {
    try {
      console.log("Fetching shipment with transactionHash:", transactionHash);
      const { data } = await axios.get(`/api/shipments?transactionHash=${transactionHash}`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching shipment data");
    }
  };

  const fetchSingleShipment = async (shipmentIndex) => {
    try {
      const response = await getallSingleShipmentDB(shipmentIndex);
      console.log("Single Shipment fetched:", response);
      if (response.shipment) {
        setSingleShipmentData(response.shipment);
      } else {
        throw new Error("Invalid data format received.");
      }
    } catch (error) {
      console.error("Error fetching Shipment Product:", error);
      setSingleShipmentData([]);
    }
  };

  const handleIndexChange = (e) => {
    const value = e.target.value;
    setIndex(value);
    fetchSingleShipment(value);
  };

  useEffect(() => {
    // Remove initial call if not needed
    // fetchSingleShipment(index);
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

  return getModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setGetModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setGetModel(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Tracking Details
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Product ID"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-400 shadow-sm rounded-lg"
                  onChange={handleIndexChange}
                />
              </div>

              <button
                onClick={() => fetchSingleShipment(index)}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-gray-400 hover:bg-gray-600 active:bg-gray-500 rounded-lg ring-offset-2 ring-gray-600 focus:ring-2"
              >
                Get Details
              </button>
            </form>

            {singleShipmentData == undefined ? (
              ""
            ) : (
              <div className="text-left">
                {/* <p>Sender: {singleShipmentData.sender}...</p> */}
                <p>Receiver: {singleShipmentData.receiver}...</p>
                <p>PickupTime: {singleShipmentData.pickupTime}</p>
                {/* <p>Transaction Hash: {singleShipmentData.transactionHash}</p> */}
                <p>Distance: {singleShipmentData.distance}</p>
                <p>Price: {singleShipmentData.price}</p>
                <p>Status: {singleShipmentData.status}</p>
                <p>Paid: {singleShipmentData.isPaid ? "Complete" : "Not Complete"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
