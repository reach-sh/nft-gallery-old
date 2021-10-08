import MyAlgoLogo from "../assets/MyAlgoBlue.svg";
import AlgoSignerLogo from "../assets/AlgoSigner.svg";
import WalletConnectLogo from "../assets/WalletConnect.svg";
import UnderConstruction from "../assets/UnderConstruction.png";
import { connectWallet } from "../lib/connectWallet";
import { useContext } from "react";
import AppContext from "../context/appContext";

import Modal from "./Modal";

const WalletModal = (props: { close: any }) => {
  const appContext = useContext(AppContext);
  const connect = connectWallet(appContext.set);

  return (
    <Modal>
      <p
        className="text-4xl text-white text-center mb-16"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Connect Wallet
      </p>
      <WalletButton fn={connect.MyAlgo} logo={MyAlgoLogo} name="MyAlgo" />
      <span>
        <WalletButton fn={async () => {}} logo={AlgoSignerLogo} name="AlgoSigner" />
        <img src={UnderConstruction} alt="" className="absolute w-20 right-5 top-1/2" />
      </span>
      <span>
        <WalletButton fn={async () => {}} logo={WalletConnectLogo} name="WalletConnect" />
        <img
          src={UnderConstruction}
          alt=""
          className="absolute w-20 right-5 top-2/3 transform translate-y-3"
        />
      </span>
      <button
        className="absolute text-white right-5 top-5 transform scale-105"
        onClick={props.close}
      >
        <span className="material-icons">close</span>
      </button>
    </Modal>
  );
};

const WalletButton = (props: { logo: string; name: string; fn: () => Promise<any> }) => {
  return (
    <div className="grid grid-rows-1 grid-cols-12 transform bg-white pl-8 hover:bg-gray-200 rounded-xl mb-6 p-4">
      <img src={props.logo} alt={props.name} className="w-12 h-14 col-span-2" />
      <button
        className="col-span-10 text-center text-2xl pr-10"
        style={{ fontFamily: "'Syne', sans-serif" }}
        onClick={props.fn}
      >
        {props.name}
      </button>
    </div>
  );
};

export default WalletModal;
