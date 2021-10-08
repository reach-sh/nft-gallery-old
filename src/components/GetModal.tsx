import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect";
import { conf } from "../lib/config";
import { loadStdlib } from "@reach-sh/stdlib";

import Modal from "./Modal";
import { useState } from "react";
import { Step, StepButton, StepTitle } from "./ModalHelpers";

const SafeTransfer = require("../contracts/build/safeTransfer.main.mjs");
const AtomicTransfer = require("../contracts/build/atomicTransfer.main.mjs");

const stdlib = loadStdlib("ALGO");

stdlib.setWalletFallback(
  stdlib.walletFallback({
    providerEnv: conf.network,
    MyAlgoConnect,
  })
);

type GetModalProps = {
  appId: number;
  close: () => void;
};

const GetModal = (props: GetModalProps) => {
  const [step, setStep] = useState<number>(0);
  const [timedOut, setTimedOut] = useState<boolean>(false);

  const [acc, setAcc] = useState<any>(null);
  const [backend, setBackend] = useState<any>(null);
  const [ctc, setCtc] = useState<any>(null);

  const [acceptResolve, setAcceptResolve] = useState<any>(null);

  const [params, setParams] = useState<any>(null);

  const connectWallet = async () => {
    try {
      setAcc(await stdlib.getDefaultAccount());
      setStep((prevState) => prevState + 1);
    } catch (e) {}
  };

  const selectBackend = (idx: number) => () => {
    try {
      setBackend(idx === 0 ? SafeTransfer : AtomicTransfer);
      setStep((prevState) => prevState + 1);
    } catch (e) {}
  };

  const attachToContract = async () => {
    try {
      setCtc(await acc.attach(backend, props.appId));
    } catch (e) {}
  };

  const startTransfer = async () => {
    try {
      const bobInterface = {
        seeTimeout: () => {
          setTimedOut(true);
        },
        seeTransfer: () => {
          setStep((prevState) => prevState + 1);
        },
        acceptSwap: async (transferParams: any) => {
          await acc.acceptToken(
            transferParams?.tokenA ? transferParams.tokenA : transferParams.token
          );

          setParams(
            transferParams?.tokenB
              ? {
                  type: "atomic",
                  tokenA: transferParams.tokenA,
                  amountA: transferParams.amountA,
                  tokenB: transferParams.tokenB,
                  amountB: transferParams.amountB,
                }
              : {
                  type: "standard",
                  tokenA: transferParams.token,
                  amountA: transferParams.amountToken,
                  amountB: transferParams.amountAlgo,
                }
          );

          await new Promise((resolve) => {
            setStep((prevState) => prevState + 1);
            setAcceptResolve(resolve);
          });

          setStep((prevState) => prevState + 1);
        },
      };

      backend.Bob(ctc, bobInterface);
      setStep((prevState) => prevState + 1);
    } catch (e) {}
  };

  return (
    <Modal outClick={props.close}>
      <button className="relative text-white self-end -right-3" onClick={props.close}>
        <span className="material-icons">close</span>
      </button>
      <Step active={step === 0}>
        <div className="flex justify-between">
          <StepTitle txt="Step One: Connect Wallet" extraStyle="self-center" />
          <StepButton fn={connectWallet} disabled={step !== 0} txt="Connect Wallet" />
        </div>
      </Step>

      <Step active={step === 1}>
        <div className="flex justify-between">
          <StepTitle txt="Step Two: Select Payment" extraStyle="self-center" />
          <span>
            <button
              disabled={step !== 1}
              className={
                "px-3 py-2 rounded-l-lg mr-0 syne " +
                (step === 1
                  ? " bg-indigo-700 hover:bg-indigo-600 text-white"
                  : "bg-indigo-200 text-gray-800")
              }
              onClick={selectBackend(0)}
            >
              With Algo
            </button>
            <button
              disabled={step !== 1}
              className={
                "px-3 py-2 my-2 border-black border-l-2 rounded-r-lg ml-0 syne " +
                (step === 1
                  ? " bg-indigo-700 hover:bg-indigo-600 text-white"
                  : "bg-indigo-200 text-gray-800")
              }
              onClick={selectBackend(1)}
            >
              With Tokens
            </button>
          </span>
        </div>
        <p className="anaheim rounded-lg mt-5 text-center text-lg text-white bg-red-700 mx-2 p-3">
          Get the payment information from the sender, {<br />} if you choose the wrong type
          transfer will fail!
        </p>
      </Step>

      <Step active={step === 2}>
        <div className="flex justify-between">
          <StepTitle txt="Step Three: Attach to Contract" extraStyle="self-center" />
          <StepButton fn={attachToContract} txt="Attach to Contract" disabled={!(step === 2)} />
        </div>
      </Step>

      <Step active={step === 3}>
        <div className="flex justify-between">
          <StepTitle txt="Step Four: Start Transfer" extraStyle="self-center" />
          <StepButton fn={startTransfer} txt="Start Transfer" disabled={!(step === 3)} />
        </div>
      </Step>

      <Step active={step === 4}>
        <StepTitle txt="Step Five: Accept Terms" />

        {params && (
          <>
            <div className="flex my-2 mt-3">
              <p className="syne font-bold text-lg mr-5">NFT ID</p>
            </div>

            <div className=" bg-gray-500 rounded py-1 px-2">
              <p className="syne text-lg">{params.tokenA}</p>
            </div>

            <div className="flex my-2 mt-3">
              <p className="syne font-bold text-lg mr-5">Price</p>
            </div>

            <div className=" bg-gray-500 rounded py-1 px-2">
              <p className="anaheim font-bold text-2xl">
                Price: {params.amountB} {params.type === "atomic" ? "Tokens" : "Algo"}
              </p>
              {params.type === "atomic" && (
                <small className="syne">Token ID: {params.tokenB}</small>
              )}
            </div>

            <div className="w-full flex justify-evenly bg-gray-600">
              <button
                className="syne p-2 mb-2 flex-1 mr-1 ml-3 rounded bg-green-800 text-white hover:bg-green-700"
                onClick={acceptResolve}
              >
                Accept
              </button>

              <button
                className="syne p-2 mb-2 flex-1 mr-1 ml-3 rounded bg-red-800 text-white hover:bg-red-700"
                onClick={props.close}
              >
                Reject
              </button>
            </div>
          </>
        )}
      </Step>

      <Step active={step === 5}>
        <StepTitle txt="Step Six: Wait For Transfer" />
      </Step>
    </Modal>
  );
};

export default GetModal;
