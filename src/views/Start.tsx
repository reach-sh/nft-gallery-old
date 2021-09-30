import { useContext, useState } from "react";
import WalletModal from "../components/WalletModal";
import { VIEWS } from "../constants";
import AppContext from "../context/appContext";

import Reach from "../assets/Reach.svg";

const Start = () => {
  const appContext = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const goToLib = () => {
    appContext.set("view", VIEWS.LIBRARY);
  };

  return (
    <div
      className="grid justify-items-center place-items-center h-screen w-screen"
      style={{ backgroundColor: "#171717" }}
    >
      <img src={Reach} alt="Reach Logo" className="absolute bottom-12 text-center w-16" />
      <div>
        <h1
          className="text-9xl mb-20 font-bold text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          ga//ery
        </h1>
        <div className="flex flex-row justify-between">
          <button
            className="p-4 rounded-md text-white bg-indigo-700 hover:bg-indigo-500"
            style={{ fontFamily: "'Syne', sans-serif" }}
            onClick={goToLib}
          >
            Go To My Collection
          </button>

          <div className="flex rounded-md bg-gray-200">
            <span className="material-icons self-center mx-3 opacity-50">play_arrow</span>
            <input
              disabled
              className="anaheim h-full rounded-r-md pl-5 text-xl"
              placeholder="Search for an app"
            />
          </div>
        </div>
      </div>
      {showModal && <WalletModal close={handleCloseModal} />}
    </div>
  );
};

export default Start;
