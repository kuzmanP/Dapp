// import { useState } from "react";

// export default ({ completeModal, setCompleteModal, completeShipment }) => {
//   const [completeShip, setCompleteShip] = useState({
//     recevier: "",
//     index: "",
//   });

//   const changeStatus = async () => {
//     completeShipment(completeShip);
//   };
//   return completeModal ? (
//     <div className="fixed inset-0 z-10 overflow-y-auto">
//       <div
//         className="fixed inset-0 w-full h-full bg-black opacity-40"
//         onClick={() => setCompleteModal(false)}
//       ></div>
//       <div className="flex items-center min-h-screen px-4 py-8">
//         <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
//           <div className="flex justify-end">
//             <button
//               className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
//               onClick={() => setCompleteModal(false)}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5 mx-auto"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
//             <h4 className="text-lg font-medium text-gray-800">
//               Complete Transport
//             </h4>

//             <form onSubmit={(e) => e.preventDefault()}>
//               <div className="relative mt-3">
//                 <input
//                   type="text"
//                   placeholder="Recevier"
//                   className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-400 shadow-sm rounded-lg"
//                   onChange={(e) =>
//                     setCompleteShip({
//                       ...completeShip,
//                       recevier: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="relative mt-3">
//                 <input
//                   type="number"
//                   placeholder="ID"
//                   className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-400 shadow-sm rounded-lg"
//                   onChange={(e) =>
//                     setCompleteShip({
//                       ...completeShip,
//                       index: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <button
//                 onClick={() => changeStatus()}
//                 className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-gray-400 hover:bg-gray-600 active:bg-gray-500 rounded-lg ring-offset-2 ring-gray-600 focus:ring-2"
//               >
//                 Complete
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

export default ({ completeModal, setCompleteModal, completeShipment }) => {
  const [completeShip, setCompleteShip] = useState({
    receiver: "",
    index: "",
  });
  const [displayText, setDisplayText] = useState("");

  const changeStatus = async () => {
    try {
      const response = await getallLBCCountDB();
      setDisplayText(response); // pass the count to displayText
    } catch (error) {
      console.error(error);
    }
  };

  const getallLBCCountDB = async () => {
    try {
      const { data } = await axios.get('/api/lbc?count=true');
      console.log(data); // Log the data for debugging
  
      let count = 0;
      
      // Assuming `data` is an array
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          count++;
        }
      }
      // If `data` is an object with properties
      else if (typeof data === 'object' && data !== null) {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            count++;
          }
        }
      }
      
      return count;
    } catch (error) {
      console.error('Error fetching data:', error);
      return 0; // Return 0 or handle the error as needed
    }
  };

  return completeModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCompleteModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCompleteModal(false)}
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
              Total LBC
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <button
                onClick={() => changeStatus()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-gray-400 hover:bg-gray-600 active:bg-gray-500 rounded-lg ring-offset-2 ring-gray-600 focus:ring-2"
              >
                Check
              </button>
              {displayText && (
                <h4 className="text-lg font-medium text-gray-800">
                  {displayText}
                </h4>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};