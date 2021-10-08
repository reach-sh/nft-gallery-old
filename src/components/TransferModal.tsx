// REACH
import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect";
import { conf } from "../lib/config";
import { loadStdlib } from "@reach-sh/stdlib";

import Modal from "./Modal";
import { Step, StepButton, StepTitle } from "./ModalHelpers";
import { useState } from "react";

const SafeTransfer = require("../contracts/build/safeTransfer.main.mjs");
const AtomicTransfer = require("../contracts/build/atomicTransfer.main.mjs");

const stdlib = loadStdlib("ALGO");

stdlib.setWalletFallback(
  stdlib.walletFallback({
    providerEnv: conf.network,
    MyAlgoConnect,
  })
);

type TranferModalProps = {
  nftId: number;
  close: () => void;
};

const TransferModal = (props: TranferModalProps) => {
  const [withTokens, setWithTokens] = useState<boolean>(false);
  const handleSetWithTokens = (e: any) => setWithTokens(e.target.checked);

  const [tokenId, setTokenId] = useState<number>(0);
  const handleSetTokenId = (e: any) => setTokenId(e.target.value);

  const [free, setFree] = useState<boolean>(false);
  const handleSetFree = (e: any) => setFree(e.target.checked);

  const [amount, setAmount] = useState<number>(0);
  const handleSetAmount = (e: any) => setAmount(e.target.value);

  const [timeout, setTimeout] = useState<number>(60);
  const handleSetTimeout = (e: any) => setTimeout(e.target.value);

  const [step, setStep] = useState<number>(0);
  const [timedOut, setTimedOut] = useState<boolean>(false);

  const [acc, setAcc] = useState<any>(null);
  const [ctc, setCtc] = useState<any>(null);

  const validateFields = () => {
    // TODO: Implement this

    return true;
  };

  const confirmParams = () => {
    if (validateFields()) setStep((prevState) => prevState + 1);
    // TODO: In else statement set error state
  };

  const connectWallet = async () => {
    try {
      setAcc(await stdlib.getDefaultAccount());
      setStep((prevState) => prevState + 1);
    } catch (e) {}
  };

  const deployContract = async () => {
    try {
      setCtc(await acc.deploy(withTokens ? AtomicTransfer : SafeTransfer));
      setStep((prevState) => prevState + 1);
    } catch (e) {}
  };

  const startTransfer = async () => {
    try {
      const aliceInterface = {
        seeTimeout: () => {
          setTimedOut(true);
        },
        seeTransfer: () => {
          setStep((prevState) => prevState + 1);
        },
        getSwap: withTokens
          ? () => {
              setStep((prevState) => prevState + 1);
              return {
                tokenA: props.nftId,
                amountA: 1,
                tokenB: tokenId,
                amountB: amount,
                time: timeout,
              };
            }
          : () => {
              setStep((prevState) => prevState + 1);
              return {
                token: props.nftId,
                amountToken: 1,
                amountAlgo: amount,
                time: timeout,
              };
            },
      };

      (withTokens ? AtomicTransfer : SafeTransfer).Alice(ctc, aliceInterface);
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
          <StepButton fn={connectWallet} disabled={step > 0} txt="Connect Wallet" />
        </div>
      </Step>
      <Step active={step === 1}>
        <StepTitle txt="Step Two: Set Transfer Params" extraStyle="text-center" />

        <div className="flex my-2 mt-3">
          <p className="syne font-bold text-lg mr-5">Price</p>
        </div>

        <div className="flex bg-gray-500 rounded py-1 px-2 flex-wrap justify-around">
          <div className="flex my-2">
            <input type="checkbox" checked={free} onChange={handleSetFree} />
            <p className="anaheim font-bold text-lg mx-2">Free</p>
          </div>

          <div className="flex my-2">
            <input
              className="rounded px-3 w-20 mx-3"
              type="number"
              disabled={!withTokens}
              value={tokenId}
              onChange={handleSetTokenId}
              placeholder="Token ID"
            />
            <input type="checkbox" checked={withTokens} onChange={handleSetWithTokens} />
            <p className="anaheim font-bold text-lg mx-2">Use Tokens</p>
          </div>

          <div className="flex my-2">
            <input
              className="rounded text-black px-3 mx-3 anaheim text-lg w-24"
              type="number"
              disabled={free}
              value={amount}
              onChange={handleSetAmount}
            />
            <p className="anaheim font-bold text-lg mx-2">{withTokens ? "TOKENS" : "ALGO"}</p>
          </div>
        </div>

        <div className="flex my-2 mt-3">
          <p className="syne font-bold text-lg mr-5">Timeout</p>
        </div>

        <div className="flex bg-gray-500 rounded py-1 px-2 flex-wrap justify-around ">
          <div className="flex my-2">
            <input
              className="rounded px-3 mx-3 text-black anaheim text-lg w-24"
              type="number"
              value={timeout}
              onChange={handleSetTimeout}
            />
            <p className="anaheim font-bold text-lg mx-2">SECONDS</p>
          </div>
        </div>

        <StepButton fn={confirmParams} txt="Confirm Details" disabled={!(step === 1)} />
      </Step>
      <Step active={step === 2}>
        <div className="flex justify-between">
          <StepTitle txt="Step Three: Deploy Contract" extraStyle="self-center" />
          <StepButton fn={deployContract} txt="Deploy Contract" disabled={!(step === 2)} />
        </div>
      </Step>
      <Step active={step === 3}>
        <div className="flex justify-between">
          <StepTitle txt="Step Four: Start Transfer" extraStyle="self-center" />
          <StepButton fn={startTransfer} txt="Start Transfer" disabled={!(step === 3)} />
        </div>
      </Step>
      <Step active={step === 4}>
        <StepTitle txt="Step Five: Send NFT" />
      </Step>
      <Step active={step === 5}>
        <StepTitle txt="Step Six: Wait For Transfer" />
      </Step>
    </Modal>
  );
};
export default TransferModal;
