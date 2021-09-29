import { useState } from "react";
import WalletModal from "../components/WalletModal";

const Start = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div
      className="grid justify-items-center place-items-center h-screen w-screen"
      style={{ backgroundColor: "#171717" }}
    >
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
            onClick={handleShowModal}
          >
            Connect Wallet
          </button>

          <div className="flex rounded-md bg-gray-200">
            <span className="material-icons self-center mx-3 opacity-50">search</span>
            <input className="anaheim h-full rounded-r-md pl-5" placeholder="Search for a user" />
          </div>
        </div>
      </div>
      {showModal && <WalletModal close={handleCloseModal} />}
    </div>
  );
};

export default Start;
