import { useContext } from "react";
import { VIEWS } from "../constants";
import AppContext from "../context/appContext";

import Reach from "../assets/Reach.svg";
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
      className="grid justify-items-center place-items-center h-screen w-screen"
      style={{ backgroundColor: "#171717" }}
    >
      <img
        style={{ position: "absolute", left: "48.5%" }}
        src={Reach}
        alt="Reach Logo"
        className="bottom-12 w-16"
      />
      <div>
        <h1
          className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-20 font-bold text-center text-white"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          ga//ery
        </h1>
        <div className="flex flex-row justify-center mx-4 gap-8">
          <button
            className="p-2 md:p-3 lg:p-3 xl:p-4 text-white bg-indigo-500 hover:bg-indigo-400 transition-colors"
            style={{ fontFamily: "'Syne', sans-serif" }}
            onClick={goToLib}
          >
            Go To My Collection
          </button>
        </div>

        <select
          className="absolute right-8 top-8 py-2 px-4 bg-indigo-500 syne text-white border-none"
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
