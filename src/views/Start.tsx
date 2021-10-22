import { useContext, useState } from "react";
import WalletModal from "../components/WalletModal";
import { VIEWS } from "../constants";
import AppContext from "../context/appContext";

import Reach from "../assets/Reach.svg";
import BuyerModal from "../components/GetModal";

const Start = () => {
  const appContext = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const [showGetModal, setShowGetModal] = useState<boolean>(false);
  const handleGetModal = (open: boolean) => () => setShowGetModal(open);

  const [appId, setAppId] = useState<string>("");
  const handleAppId = (e: any) => setAppId(e.target.value);

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
            <button onClick={handleGetModal(true)}>
              <span className="material-icons self-center mx-3 opacity-50">play_arrow</span>
            </button>
            <input
              value={appId}
              onChange={handleAppId}
              className="anaheim h-full rounded-r-md pl-5 text-xl"
              placeholder="Search for an app"
            />
          </div>
        </div>
      </div>
      {showGetModal && <BuyerModal appId={appId} close={handleGetModal(false)} />}
      {showModal && <WalletModal close={handleCloseModal} />}
    </div>
  );
};

export default Start;
