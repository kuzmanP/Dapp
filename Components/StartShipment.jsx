// import { useState } from "react";
// import { Str1 } from "../Components/index";

// export default ({ startModal, setStartModal, startShipment }) => {
//   const [getProduct, setGetProduct] = useState({
//     reveiver: "",
//     index: "",
//   });

//   const startShipping = () => {
//     startShipment(getProduct);
//   };
//   return startModal ? (
//     <div className="fixed inset-0 z-10 overflow-y-auto">
//       <div
//         className="fixed inset-0 w-full h-full bg-black opacity-40"
//         onClick={() => setStartModal(false)}
//       ></div>
//       <div className="flex items-center min-h-screen px-4 py-8">
//         <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
//           <div className="flex justify-end">
//             <button
//               className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
//               onClick={() => setStartModal(false)}
//             >
//               <Str1 />
//             </button>
//           </div>
//           <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
//             <h4 className="text-lg font-medium text-gray-800">
//               Start Transport
//             </h4>

//             <form onSubmit={(e) => e.preventDefault()}>
//               <div className="relative mt-3">
//                 <input
//                   type="text"
//                   placeholder="Receiver"
//                   className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-400 shadow-sm rounded-lg"
//                   onChange={(e) =>
//                     setGetProduct({
//                       ...getProduct,
//                       reveiver: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="relative mt-3">
//                 <input
//                   type="text"
//                   placeholder="Product ID"
//                   className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-400 shadow-sm rounded-lg"
//                   onChange={(e) =>
//                     setGetProduct({
//                       ...getProduct,
//                       index: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <button
//                 onClick={() => startShipping()}
//                 className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-gray-400 hover:bg-gray-600 active:bg-gray-500 rounded-lg ring-offset-2 ring-gray-600 focus:ring-2"
//               >
//                 Start Transport
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     ""
//   );
// };


import { useState } from "react";
import axios from "axios";

export default ({ startModal, setStartModal, startShipment }) => {
  const [getProduct, setGetProduct] = useState({
    receiver: "",
    index: "",
  });
  const [displayText, setDisplayText] = useState("");

  const startShipping = async () => {
    try {

      // Example of fetching some status or result after shipment
      const response = await CountFarmers();
      setDisplayText(response); // Pass the status or result to displayText
    } catch (error) {
      console.error('Error counting farmer:', error);

    }
  };

  const CountFarmers = async () => {
    try {
      const { data } = await axios.get('/api/farmers?count=true');
      console.log(data); // Log the data for debugging

      let count = 0;

      // Handle case where data is an array of arrays
      if (Array.isArray(data)) {
        for (const item of data) {
          if (Array.isArray(item)) {
            count += item.length; // Count items in nested arrays
          } else {
            count++;
          }
        }
      }
      // Handle case where data is an object with array properties
      else if (typeof data === 'object' && data !== null) {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (Array.isArray(value)) {
              count += value.length; // Count items in array properties
            } else {
              count++;
            }
          }
        }
      }

      return count;
    } catch (error) {
      console.error('Error fetching data:', error);
      return 0; // Return 0 or handle the error as needed
    }
  };


  return startModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setStartModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setStartModal(false)}
            >

            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Total Farmers Transport
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <button
                  onClick={() => startShipping()}
                  className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-gray-400 hover:bg-gray-600 active:bg-gray-500 rounded-lg ring-offset-2 ring-gray-600 focus:ring-2"
                >
                  Check
                </button>
                {displayText && (
                  <h4 className="text-lg font-medium text-gray-800">
                    {displayText}
                  </h4>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
