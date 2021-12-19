import { useState } from "react";
import { setStorageItem } from "../lib/helpers";
import { isValidAddress } from "algosdk";

type AddressModalProps = {
  addresses: string[];
  setAddresses: any;
  outClick: () => void;
};

const AddressModal = (props: AddressModalProps) => {
  const [curAddr, setCurAddr] = useState<string>("");

  const handleAddrChange = (e: any) => {
    setCurAddr(e.target.value);
  };

  const stopBubble = (e: any) => {
    e.stopPropagation();
  };

  const addAddress = (e: any) => {
    e.preventDefault();

    if (!isValidAddress(curAddr)) {
      setCurAddr("");
      return;
    }

    const newAccs = [...new Set([...props.addresses, curAddr])];

    setCurAddr("");
    setStorageItem("accounts", newAccs, []);
    props.setAddresses(newAccs);
  };

  const rmAddress = (address: string) => {
    const newAccs = props.addresses.filter((addr) => addr !== address);

    setStorageItem("accounts", newAccs, []);
    props.setAddresses(newAccs);
  };

  return (
    <div
      onClick={props.outClick}
      className="fixed left-0 top-0 w-screen h-screen grid justify-items-center bg-black bg-opacity-20"
    >
      <div
        onClick={stopBubble}
        className="w-10/12 sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-5/12 
        bg-black text-white self-center justify-center p-4 flex flex-col items-center"
      >
        <button className="material-icons self-end" onClick={props.outClick}>
          close
        </button>
        <div className="syne text-3xl text-center">Enter address(es)</div>

        <div className="py-5" />

        <span className="flex" style={{ width: "70%" }}>
          <form action="" className="flex w-full">
            <input
              style={{ width: "80% " }}
              className="bg-black border-white border-4 text-white w-full pl-5"
              value={curAddr}
              onChange={handleAddrChange}
              placeholder="Enter address"
              type="text"
            />
            <button
              style={{ width: "20%" }}
              className="bg-gray-400 hover:text-white text-black border-none syne align-top"
              onClick={addAddress}
            >
              Enter
            </button>
            <input
              type="submit"
              style={{ display: "none", position: "absolute" }}
              tabIndex={-1}
            />
          </form>
        </span>

        <div className="py-5" />

        <div style={{ width: "70% " }}>
          {props.addresses.map((address) => {
            return (
              <div
                className="bg-indigo-400 bg-opacity-40 my-1 text-white anaheim text-center text-xl transition-colors hover:bg-red-700 w-full"
                onClick={() => {
                  rmAddress(address);
                }}
              >
                {address.slice(0, 10) +
                  "..." +
                  address.slice(address.length - 10)}
              </div>
            );
          })}
        </div>

        <div className="py-5" />
      </div>
    </div>
  );
};

export default AddressModal;
