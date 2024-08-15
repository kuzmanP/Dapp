import React, { useEffect, useState, useContext } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TrackingContext } from "../Conetxt/TrackingContext";
import { Nav1, Nav2, Nav3 } from "../Components/index";

export default () => {
  const [state, setState] = useState(false);
  const { currentUser, connectWallet, connectFarmerWallet, connectQCCWallet ,connectLBCWallet} = useContext(TrackingContext);
  const router = useRouter();
  const { pathname } = router;

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Farmer", path: "/farmerPage" },
    { title: "LBC", path: "/lbcPage" },
    { title: "Farmer Product Page", path: "/farmerProductPage" },
    { title: "LBC Product Page", path: "/lbcProductPage" },
    { title: "QCC Page", path: "/qccPage" },

  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-white pb-5 md:text-sm ${state
        ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
        : ""
        }`}
    >
      <div className="gap-x-10 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-amber-800 text-2xl">COCOBOD</span>
          <a href="#">
            <img
              src="data:image/jpeg;base64,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"
              width={90}
              alt="Cocoa logo"
            />
          </a>
          </div>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? <Nav1 /> : <Nav2 />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? "block" : "hidden"
            } `}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx} className="text-gray-700 hover:text-gray-900">
                <Link href={item.path}>
                  <p>{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {currentUser ? (
              <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-[#f59e0b] font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] rounded-full md:inline-flex">
                {currentUser.slice(0, 25)}..
              </p>
            ) : (
              <>
                {pathname === "/" ? (
                  <button
                    onClick={() => connectWallet()}
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-[#f59e0b] font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] rounded-full md:inline-flex"
                  >
                    Connect Wallet
                    <Nav3 />
                  </button>
                ) : pathname === "/farmerProductPage" ? (
                  <button
                    onClick={() => connectFarmerWallet()}
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-[#f59e0b] font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] rounded-full md:inline-flex"
                  >
                    Connect Farmer Wallet
                    <Nav3 />
                  </button>
                ) : pathname === "/lbcProductPage" ? (
                  <button
                    onClick={() => connectLBCWallet()}
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-[#f59e0b] font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] rounded-full md:inline-flex"
                  >
                    Connect LBC Wallet
                    <Nav3 />
                  </button>
                ) : pathname === "/qccPage" ? (
                  <button
                    onClick={() => connectQCCWallet()}
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-[#f59e0b] font-medium bg-[#422006] hover:bg-[#341402] active:bg-[#341402] rounded-full md:inline-flex"
                  >
                    Connect QCCC Wallet
                    <Nav3 />
                  </button>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
