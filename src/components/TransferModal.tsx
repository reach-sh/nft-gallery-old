import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect";
import MyAlgoLogo from "../assets/MyAlgoBlue.svg";
import WalletConnect from "@reach-sh/stdlib/ALGO_WalletConnect";
import WalletConnectLogo from "../assets/WalletConnect.svg";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { conf } from "../lib/config";
import { loadStdlib } from "@reach-sh/stdlib";

import Modal from "./Modal";
import { useState, useReducer, useEffect } from "react";
import {
  ModalFormAlert,
  ModalFormTitle,
  ModalFormProgressButton,
  ModalFormTextInput,
  ModalFormCheckbox,
  ModalFormPriceInput,
} from "./ModalForm";

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
  SET_CONTRACT_TYPE,
  SET_APPID,
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
  appId?: string;
  contractType?: CONTRACT_TYPES;
};

function reducer(state: ModalState, action: { type: MODAL_ACTIONS; payload?: any }) {
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
      if (action.payload == null) throw new Error("Account payload is falsy");

      return {
        ...state,
        account: action.payload,
        ready: true,
      };
    case MODAL_ACTIONS.SET_CONTRACT_TYPE:
      if (action.payload == null) throw new Error("Contract type payload is falsy");

      return {
        ...state,
        contractType: action.payload,
      };
    case MODAL_ACTIONS.SET_APPID:
      if (action.payload == null) throw new Error("App ID payload is falsy");

      return {
        ...state,
        appId: action.payload,
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

const useForm = (initialValues: any) => {
  const [values, setValues] = useState<any>(initialValues);
  const handleChange = (key: string, value: any) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  return [values, handleChange];
};

type TransferModalProps = {
  nftId: number;
  close: () => void;
};

const TransferModal = (props: TransferModalProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [transferDetails, setTransferDetails] = useForm({
    withTokens: false,
    tokenId: 0,
    free: false,
    amount: 0,
    timeout: 60,
  });

  const handleOutClick = () => {
    dispatch({ type: MODAL_ACTIONS.CLEAR_ERRORS });
    props.close();
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
          nftId={props.nftId}
          closeModal={props.close}
          state={state}
          dispatch={dispatch}
          transferDetails={transferDetails}
          setTransferDetails={setTransferDetails}
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
  nftId: number;
  state: ModalState;
  dispatch: React.Dispatch<{ type: MODAL_ACTIONS; payload?: any }>;
  closeModal: any;
  transferDetails: any;
  setTransferDetails: any;
};
const FormSwitcher = (props: FormSwitcherProps) => {
  switch (props.state.step) {
    case 0:
      return <ConnectWallet state={props.state} dispatch={props.dispatch} />;
    case 1:
      return (
        <SetTransferDetails
          dispatch={props.dispatch}
          nftId={props.nftId}
          state={props.state}
          transferDetails={props.transferDetails}
          setTransferDetails={props.setTransferDetails}
        />
      );
    case 2:
      return (
        <StartTransfer
          nftId={props.nftId}
          state={props.state}
          dispatch={props.dispatch}
          transferDetails={props.transferDetails}
          setTransferDetails={props.setTransferDetails}
        />
      );
    case 3:
      return <ShareInfo state={props.state} dispatch={props.dispatch} />;
    case 4:
      return <WaitForBob />;
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

type SetTransferDetailsProps = {
  nftId: number;
  state: ModalState;
  dispatch: React.Dispatch<{ type: MODAL_ACTIONS; payload?: any }>;
  transferDetails: any;
  setTransferDetails: any;
};
const SetTransferDetails = ({
  nftId,
  state,
  dispatch,
  transferDetails,
  setTransferDetails,
}: SetTransferDetailsProps) => {
  useEffect(() => {
    dispatch({ type: MODAL_ACTIONS.MAKE_READY });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: MODAL_ACTIONS.SET_CONTRACT_TYPE,
      payload: transferDetails.withTokens ? CONTRACT_TYPES.ATOMIC : CONTRACT_TYPES.SAFE,
    });
  }, [dispatch, transferDetails.withTokens]);

  const handleChangeTarget = (f: string) => (v: any) => setTransferDetails(f, v);
  const handleChangeChecked = (f: string) => (_e: any) =>
    setTransferDetails(f, !transferDetails[f]);

  return (
    <>
      <ModalFormTitle title="Step 2: Set Transfer Details" />
      <p className="text-center text-2xl syne my-4">NFT ID: {nftId}</p>
      <div className="inline-flex justify-center w-full my-3">
        <ModalFormCheckbox
          st={transferDetails.free}
          setSt={handleChangeChecked("free")}
          label="Free"
        />
        <div className="w-2 sm:w-8 lg:w-16" />
        <ModalFormCheckbox
          st={transferDetails.withTokens}
          setSt={handleChangeChecked("withTokens")}
          label="Use ASA"
          disabled={transferDetails.free}
        />
      </div>

      <ModalFormTextInput
        label="Token ID"
        placeholder="ID of the ASA"
        st={transferDetails.tokenId}
        setSt={handleChangeTarget("tokenId")}
        type="number"
        disabled={!transferDetails.withTokens || transferDetails.free}
      />

      <ModalFormTextInput
        label="Timeout"
        placeholder="ID of the ASA"
        st={transferDetails.timeout}
        setSt={handleChangeTarget("timeout")}
        type="number"
      />

      <ModalFormPriceInput
        st={transferDetails.amount}
        setSt={handleChangeTarget("amount")}
        placeholder=""
        label="Amount"
        disabled={transferDetails.free}
        tokens={transferDetails.withTokens}
      />
    </>
  );
};

type StartTransferProps = {
  nftId: number;
  state: ModalState;
  dispatch: React.Dispatch<{ type: MODAL_ACTIONS; payload?: any }>;
  transferDetails: any;
  setTransferDetails: any;
};
const StartTransfer = ({
  nftId,
  state,
  dispatch,
  transferDetails,
  setTransferDetails,
}: StartTransferProps) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const makeError = () => dispatch({ type: MODAL_ACTIONS.ERROR_OUT });
  const makeTimeout = () => dispatch({ type: MODAL_ACTIONS.TIME_OUT });
  const makeProceed = () => dispatch({ type: MODAL_ACTIONS.PROCEED_STEP });
  const makeSetAppId = (appId: string) =>
    dispatch({ type: MODAL_ACTIONS.SET_APPID, payload: appId });

  const startTransfer = async () => {
    try {
      setClicked(true);

      const aliceInterface = {
        seeTimeout: () => {
          makeTimeout();
        },
        seeTransfer: () => {
          makeProceed();
        },
        getSwap: () =>
          transferDetails.withTokens
            ? {
                tokenA: nftId,
                amountA: 1,
                tokenB: transferDetails.tokenId,
                amountB: transferDetails.amount,
                time: transferDetails.timeout,
              }
            : {
                token: nftId,
                amountToken: 1,
                amountAlgo: stdlib.parseCurrency(transferDetails.amount),
                time: transferDetails.timeout,
              },
      };
      const backend = transferDetails.withTokens ? AtomicTransfer : SafeTransfer;

      const ctc = await state.account.contract(backend);
      ctc.p.Alice(aliceInterface);
      const ctcInfo = await ctc.getInfo();

      makeSetAppId((transferDetails.withTokens ? "a" : "s") + ctcInfo.toString());
      makeProceed();
    } catch (e) {
      console.log(e);
      makeError();
    }
  };

  return (
    <>
      <ModalFormTitle title="Step 3: Start the Transfer" />
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
            <p>You'll now sign 3 transactions</p>
            <p>- Registering the app</p>
            <p>- Setting transfer parameters</p>
            <p>- Sending the NFT to the contract</p>
          </div>
        )}
      </div>
    </>
  );
};

type ShareInfoProps = {
  state: ModalState;
  dispatch: React.Dispatch<{ type: MODAL_ACTIONS; payload?: any }>;
};
const ShareInfo = ({ state, dispatch }: ShareInfoProps) => {
  useEffect(() => {
    dispatch({ type: MODAL_ACTIONS.MAKE_READY });
  }, [dispatch]);

  const [copied, setCopied] = useState<boolean>(false);

  const fmtAppId = state.appId ?? "-";
  return (
    <>
      <ModalFormTitle title="Step 4: Share Contract Info" />
      <ModalFormAlert type="info">
        The recipient will use this information to receive the NFT
        <br />
        If you somehow lose it, find the application ID from AlgoExplorer and prepend "a" for token
        sale and "s" for standard sale
      </ModalFormAlert>
      <div className="inline-flex justify-evenly syne text-xl">
        <p className="self-center text-white">App ID: {fmtAppId}</p>
        <CopyToClipboard
          text={fmtAppId}
          onCopy={() => {
            setCopied(true);
          }}
        >
          <button className="rounded-lg shadow-lg p-3 bg-gray-800 text-white hover:bg-gray-700">
            {!copied ? "Copy" : "Copied"}
          </button>
        </CopyToClipboard>
      </div>
    </>
  );
};

const WaitForBob = () => {
  return (
    <>
      <ModalFormTitle title="Step 5: Wait For Transfer" />

      <ModalFormAlert type="info">You can close the modal now</ModalFormAlert>
    </>
  );
};

export default TransferModal;
