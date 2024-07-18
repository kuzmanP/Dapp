import { useState } from "react";

export default ({
    setRegisterLBCModel,
    registerLBCModel,
    registerLBC,
}) => {
    const [lbc, setLBC] = useState({
        name: "",
        location: "",
        dateCreated: "",
    });

    const createItem = async () => {
        try {
            await registerLBC(lbc);
            console.log(lbc)
        } catch (error) {
            console.log("Wrong creating LBC");
        }
    };
    return registerLBCModel ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setRegisterLBCModel(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex justify-end">
                        <button
                            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                            onClick={() => setRegisterLBCModel(false)}
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
                            Add to Ledger
                        </h4>

                        <form method="post" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative mt-3">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full pl-5 pr-3 py-2 text-gray-700 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
                                    onChange={(e) =>
                                        setLBC({
                                            ...lbc,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="relative mt-3">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
                                    onChange={(e) =>
                                        setLBC({
                                            ...lbc,
                                            location: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="relative mt-3">
                                <input
                                    type="date"
                                    placeholder="Date"
                                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
                                    onChange={(e) =>
                                        setLBC({
                                            ...lbc,
                                            dateCreated: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                onClick={() => createItem()}
                                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-[#f59e0b] bg-[#492407] hover:bg-[#341402] active:bg-[#341402] rounded-lg ring-offset-2 ring-gray-600 focus:ring-2"
                            >
                                Add LBC
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};
