import { useContext } from "react";
import { VIEWS } from "../constants";
import AppContext from "../context/appContext";

// import Reach from "../assets/Reach.svg";
import ReachDark from "../assets/ReachBlack.png";
import { getStorageItem, setStorageItem } from "../lib/helpers";

const Start = () => {
  const appContext = useContext(AppContext);

  const handleSelectChange = (e: any) => {
    setStorageItem("test", e.target.value, '"main"');
    window.location.reload();
  };

  const goToLib = () => {
    appContext.set("view", VIEWS.COLLECTION);
  };

  return (
    <div
      className="grid justify-items-center place-items-center h-screen w-screen bg-gradient-anim"
      // style={{ backgroundColor: "#171717" }}
    >
      <div className="absolute self-center bottom-12">
        <img src={ReachDark} alt="Reach Logo" className="w-16 shadowed" />
      </div>
      <div>
        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-20 font-bold drop-shadow-lg text-center syne">
          ga//ery
        </h1>
        <div className="flex flex-row justify-center mx-4 gap-8">
          <button
            className="p-2 md:p-3 lg:p-3 xl:p-4 text-white bg-black hover:bg-gray-900 transition-colors"
            style={{ fontFamily: "'Syne', sans-serif" }}
            onClick={goToLib}
          >
            Go To My Collection
          </button>
        </div>

        <select
          className="absolute right-8 top-8 py-2 px-4 bg-black syne text-white border-none"
          name="net-dropdown"
          id="net-dropdown"
          onChange={handleSelectChange}
          value={getStorageItem("test", '"main"')}
        >
          <option value="main">MainNet</option>
          <option value="test">TestNet</option>
        </select>
      </div>
    </div>
  );
};

export default Start;
