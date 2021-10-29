import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect";
import MyAlgoLogo from "../assets/MyAlgoBlue.svg";
import WalletConnect from "@reach-sh/stdlib/ALGO_WalletConnect";
import WalletConnectLogo from "../assets/WalletConnect.svg";

import { conf } from "../lib/config";
import { loadStdlib } from "@reach-sh/stdlib";

import Modal from "./Modal";
import { useReducer, useRef, useState } from "react";
import { ModalFormAlert, ModalFormTitle, ModalFormProgressButton } from "./ModalForm";

const SafeTransfer = require("../contracts/build/safeTransfer.main.mjs");
const AtomicTransfer = require("../contracts/build/atomicTransfer.main.mjs");

const stdlib = loadStdlib("ALGO");

enum MODAL_ACTIONS {
  MAKE_READY,
  PROCEED_STEP,
  ERROR_OUT,
  TIME_OUT,
  CLEAR_ERRORS,
  SET_ACCOUNT,
  SET_SWAP,
}

enum CONTRACT_TYPES {
  SAFE,
  ATOMIC,
}

type ModalState = {
  step: number;
  ready: boolean;
  timeout: boolean;
  error: boolean;
  account: any;
  swap: any;
};

function reducer(state: ModalState, action: { type: MODAL_ACTIONS; payload?: any }) {
  console.log(state.step);
  switch (action.type) {
    case MODAL_ACTIONS.MAKE_READY:
      return {
        ...state,
        ready: true,
      };

    case MODAL_ACTIONS.PROCEED_STEP:
      return {
        ...state,
        step: state.step + 1,
        ready: false,
      };

    case MODAL_ACTIONS.TIME_OUT:
      return {
        ...state,
        timeout: true,
      };

    case MODAL_ACTIONS.ERROR_OUT:
      return {
        ...state,
        error: true,
      };

    case MODAL_ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        error: false,
        timeout: false,
      };

    case MODAL_ACTIONS.SET_ACCOUNT:
      if (!action.payload) throw new Error("Account payload is falsy");

      return {
        ...state,
        account: action.payload,
        ready: true,
      };

    case MODAL_ACTIONS.SET_SWAP:
      if (!action.payload) throw new Error("Account payload is falsy");

      if (action.payload.contractType === CONTRACT_TYPES.ATOMIC) {
        return {
          ...state,
          step: state.step + 1,
          swap: {
            tokenA: action.payload.transferParams.tokenA,
            amountA: action.payload.transferParams.amountA,
            tokenB: action.payload.transferParams.tokenB,
            amountB: action.payload.transferParams.amountB,
          },
        };
      }

      return {
        ...state,
        step: state.step + 1,
        swap: {
          tokenA: action.payload.transferParams.token,
          amountA: action.payload.transferParams.amountToken,
          amountB: action.payload.transferParams.amountAlgo,
        },
      };

    default:
      return state;
  }
}

const initialState: ModalState = {
  step: 0,
  ready: false,
  timeout: false,
  error: false,
  account: null,
  swap: null,
};

type BuyerModalProps = {
  appId: string; // e.g. 123456a / 123456s
  close: () => void;
};

const BuyerModal = (props: BuyerModalProps) => {
  const contractType =
    props.appId.slice(0, 1) === "a" ? CONTRACT_TYPES.ATOMIC : CONTRACT_TYPES.SAFE;
  const appId = parseInt(props.appId.slice(1));

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOutClick = () => {
    dispatch({ type: MODAL_ACTIONS.CLEAR_ERRORS });
    props.close();
  };

  const acceptRef = useRef<any>();
  const setAcceptRef = (data: any) => {
    acceptRef.current = data;
  };
  const acceptPrice = () => {
    // dispatch({ type: MODAL_ACTIONS.PROCEED_STEP });
    acceptRef.current(true);
  };

  if (state.error)
    return (
      <Modal outClick={handleOutClick}>
        <div className="text-2xl text-white text-center p-6 my-6">
          <span className="material-icons transform scale-150 mb-4">error</span>
          <h2 className="syne">
            An error occured while transferring.
            <br />
            Please refresh and try again.
          </h2>
        </div>
      </Modal>
    );

  return (
    <Modal outClick={props.close}>
      <div style={{ minHeight: "40vh" }} className="overflow-y-auto flex flex-col">
        <FormSwitcher
          state={state}
          dispatch={dispatch}
          contractType={contractType}
          appId={appId}
          acceptPrice={acceptPrice}
          setAcceptRef={setAcceptRef}
          closeModal={props.close}
        />
      </div>

      <div style={{ minHeight: "10vh" }} className=" flex justify-around items-center">
        {state.ready && (
          <ModalFormProgressButton
            txt="Next >"
            state="open"
            onClick={() => dispatch({ type: MODAL_ACTIONS.PROCEED_STEP })}
          />
        )}
      </div>
    </Modal>
  );
};

type FormSwitcherProps = {
  appId: number;
  contractType: CONTRACT_TYPES;
  state: ModalState;
  dispatch: React.Dispatch<{ type: MODAL_ACTIONS; payload?: any }>;
  acceptPrice: any;
  setAcceptRef: any;
  closeModal: any;
};
const FormSwitcher = (props: FormSwitcherProps) => {
  switch (props.state.step) {
    case 0:
      return <ConnectWallet state={props.state} dispatch={props.dispatch} />;
    case 1:
      return (
        <StartTransfer
          state={props.state}
          dispatch={props.dispatch}
          contractType={props.contractType}
          appId={props.appId}
          setAcceptRef={props.setAcceptRef}
        />
      );
    case 2:
      return (
        <AcceptParams
          contractType={props.contractType}
          state={props.state}
          acceptPrice={props.acceptPrice}
          closeModal={props.closeModal}
        />
      );
    default:
      return <div />;
  }
};

const ConnectWallet = ({ dispatch }: any) => {
  const makeError = () => dispatch({ type: MODAL_ACTIONS.ERROR_OUT });
  const setAccount = (acc: any) => dispatch({ type: MODAL_ACTIONS.SET_ACCOUNT, payload: acc });

  const handleMyAlgoConnect = async () => {
    try {
      stdlib.setWalletFallback(
        stdlib.walletFallback({
          providerEnv: conf.network,
          MyAlgoConnect,
        })
      );

      setAccount(await stdlib.getDefaultAccount());
    } catch (e) {
      console.log(e);
      makeError();
    }
  };

  const handleWalletConnect = async () => {
    try {
      stdlib.setWalletFallback(
        stdlib.walletFallback({
          providerEnv: conf.network,
          WalletConnect,
        })
      );

      setAccount(await stdlib.getDefaultAccount());
    } catch (e) {
      console.log(e);
      makeError();
    }
  };

  return (
    <>
      <ModalFormTitle title="Step 1: Connect Wallet" />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="md:w-2/3">
          <button
            onClick={handleMyAlgoConnect}
            className="syne inline-flex justify-around text-lg text-center mb-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg p-3 w-full items-center"
          >
            <img src={MyAlgoLogo} alt="My Algo Logo" className="w-10" />
            My Algo Wallet
          </button>
          <button
            onClick={handleWalletConnect}
            className="syne inline-flex justify-around text-lg text-center mb-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg p-3 w-full items-center"
          >
            <img src={WalletConnectLogo} alt="My Algo Logo" className="w-10" />
            Wallet Connect
          </button>
        </div>
      </div>
    </>
  );
};

type StartTransferProps = {
  appId: number;
  contractType: CONTRACT_TYPES;
  state: ModalState;
  dispatch: React.Dispatch<{ type: MODAL_ACTIONS; payload?: any }>;
  setAcceptRef: any;
};
const StartTransfer = ({
  contractType,
  appId,
  state,
  dispatch,
  setAcceptRef,
}: StartTransferProps) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const makeError = () => dispatch({ type: MODAL_ACTIONS.ERROR_OUT });
  const makeTimeout = () => dispatch({ type: MODAL_ACTIONS.TIME_OUT });
  const makeProceed = () => dispatch({ type: MODAL_ACTIONS.PROCEED_STEP });
  const makeSetSwap = (params: any) => dispatch({ type: MODAL_ACTIONS.SET_SWAP, payload: params });

  const startTransfer = async () => {
    try {
      setClicked(true);
      const backend = contractType === CONTRACT_TYPES.ATOMIC ? AtomicTransfer : SafeTransfer;
      const ctc = await state.account.contract(backend, appId);

      const bobInterface = {
        seeTimeout: () => {
          makeTimeout();
        },

        seeTransfer: () => {
          console.log("seeTransfer");
          makeProceed();
        },

        acceptSwap: async (transferParams: any) => {
          // Accept the NFT
          const asa =
            contractType === CONTRACT_TYPES.ATOMIC ? transferParams.tokenA : transferParams.token;
          await state.account.tokenAccept(asa);

          makeSetSwap({ transferParams, contractType });

          return await new Promise<boolean>((resolve) => {
            setAcceptRef(resolve);
          });
        },
      };

      ctc.p.Bob(bobInterface);
    } catch (e) {
      console.log(e);
      makeError();
    }
  };

  return (
    <>
      <ModalFormTitle title="Step 2: Start the Transfer" />
      <ModalFormAlert type="warning">
        This is an experimental feature, your funds may be lost forever.
      </ModalFormAlert>

      <div className="flex-grow flex flex-col items-center justify-center">
        {!clicked ? (
          <button
            onClick={startTransfer}
            className="px-5 py-4 shadow-lg rounded-lg bg-green-800 syne text-white"
          >
            I know the risks, start the transfer
          </button>
        ) : (
          <div className="text-2xl syne text-white">
            <p>You'll now sign 1 transaction</p>
            <p>- Opting in for the asset</p>
          </div>
        )}
      </div>
    </>
  );
};

type AcceptParamsProps = {
  state: ModalState;
  contractType: CONTRACT_TYPES;
  acceptPrice: any;
  closeModal: any;
};
const AcceptParams = ({ state, contractType, acceptPrice, closeModal }: AcceptParamsProps) => {
  return (
    <>
      <ModalFormTitle title="Step 3: Accept the Parameters" />
      <div className="bg-white text-center syne p-4 text-2xl rounded-lg shadow-lg">
        <p> NFT ID: {state.swap.tokenA.toString()}</p>
        {contractType === CONTRACT_TYPES.ATOMIC ? (
          <>
            <p className="">Price {stdlib.formatCurrency(state.swap.amountB, 4)} TOKENS</p>
            <small className="">Token ID: {state.swap.tokenB.toString()}</small>
          </>
        ) : (
          <p className="">Price {stdlib.formatCurrency(state.swap.amountB, 4)} ALGO</p>
        )}
      </div>
      <div className="w-full flex justify-evenly mt-5">
        <button
          className="syne p-2 mb-2 flex-1 mr-1 ml-3 rounded bg-green-800 text-white hover:bg-green-700"
          onClick={acceptPrice}
        >
          Accept
        </button>

        <button
          className="syne p-2 mb-2 flex-1 mr-1 ml-3 rounded bg-red-800 text-white hover:bg-red-700"
          onClick={closeModal}
        >
          Reject
        </button>
      </div>
    </>
  );
};

export default BuyerModal;
