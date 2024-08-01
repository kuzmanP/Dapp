// import images from "../Images/index";
// import Image from "next/image";

export default ({
  setOpenProfile,
  setCompleteModal,
  setGetModel,
  setStartModal,
  // setTotalTransport
}) => {
  const services = [
    {
      title: "Total LBC", //complete
    },
    {
      title: "Get Details",
    },
    // {
    //   title: "Total Farmer", //start
    // }, 
    // {
    //   title: "User",
    // },
    // {
    //   title: "Total Transport",
    // },
    {
      title: "Total Farmers", //send
    },
  ];


  const openModelBox = (text) => {
    console.log("Text: ", text);
    if (text === 1) {
      setCompleteModal(true);
    } else if (text === 2) {
      setGetModel(true);
    } else if (text === 3) {
      setStartModal(true);
    } else if (text === 4) {
      setOpenProfile(true);
    }
    // else if (text === 5) {
    //   setTotalTransport(true);
    // }
  };
  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map(({ title }, i) => (
              <li key={i}>
                <div
                  onClick={() => openModelBox(i + 1)}
                  className="flex justify-center items-center w-full h-60 sm:h-52 md:h-56 bg-[#422006] text-[#f59e0b] rounded-2xl cursor-pointer text-center shadow-md hover:bg-[#341402] transition duration-300"
                >
                  <p className="mb-0 text-2xl font-bold whitespace-pre">{title.toUpperCase()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
