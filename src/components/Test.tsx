// import { useReducer, useRef, useState } from "react";

// const Modal = (props: any) => {
//   const stopBubble = (e: any) => {
//     e.stopPropagation();
//   };

//   return (
//     <div
//       onClick={props.outClick}
//       className="fixed left-0 top-0 w-screen h-screen grid justify-items-center bg-yellow-100 bg-opacity-70"
//     >
//       <div
//         className="
//             w-10/12
//             sm:w-9/12
//             md:w-8/12
//             lg:w-7/12
//             xl:w-5/12

//             bg-indigo-800
//             rounded-xl
//             self-center
//             shadow-xl

//             p-4
//             flex flex-col
//             justify-center
//             overflow-x-hidden
//         "
//         style={{ maxHeight: "70vh" }}
//         onClick={stopBubble}
//       >
//         {props.children}
//       </div>
//     </div>
//   );
// };

// type ProgressButtonProps = {
//   state: "open" | "closed" | "restricted";
//   txt: string;
//   onClick: any;
// };
// const ProgressButton = (props: ProgressButtonProps) => {
//   const stateColor =
//     props.state === "open"
//       ? "bg-green-600"
//       : props.state === "closed"
//       ? "bg-gray-800"
//       : props.state === "restricted"
//       ? "bg-red-800"
//       : "bg-indigo-700";

//   return (
//     <button
//       className={"shadow-lg rounded-2xl py-4 px-5 h-full syne text-white " + stateColor}
//       onClick={props.onClick}
//     >
//       {props.txt}
//     </button>
//   );
// };

// // const Test = () => {
// //   const [f1, setF1] = useState<string>("");
// //   const [f2, setF2] = useState<number>(0);
// //   const [c1, setC1] = useState<boolean>(false);

// //   return (
// //     <>
// //       <Modal>
// //         <div style={{ minHeight: "40vh" }} className="overflow-y-auto">
// //           <p className="text-5xl syne text-center my-3 shadow-sm text-white">Title</p>
// //           <ModalFormAlert type="warning">
// //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quisquam perferendis
// //             ullam, similique aliquam earum error exercitationem porro consequuntur eligendi, ea
// //             tempora dolorem minima officia veniam quos facere, facilis excepturi.
// //           </ModalFormAlert>
// //           <form>
// //             <ModalFormTextInput
// //               st={f1}
// //               setSt={setF1}
// //               label="Field 1"
// //               placeholder="Fill the field"
// //             />
// //             <ModalFormTextInput
// //               st={f1}
// //               setSt={setF1}
// //               label="Field 1"
// //               placeholder="Fill the field"
// //               disabled={true}
// //             />
// //             <div className="inline-flex justify-center w-full my-3">
// //               <ModalFormCheckbox st={c1} setSt={setC1} label="Free" />
// //               <div className="w-2 sm:w-8 lg:w-16" />
// //               <ModalFormCheckbox st={c1} setSt={setC1} label="Use ASA" disabled={true} />
// //             </div>

// //             <ModalFormPriceInput
// //               st={f2}
// //               setSt={setF2}
// //               placeholder=""
// //               label="Amount"
// //               disabled={true}
// //             />
// //           </form>
// //         </div>
// //         <div style={{ minHeight: "10vh" }} className=" flex justify-around items-center">
// //           <ProgressButton txt="< Previous" state="closed" />
// //           <ProgressButton txt="Next >" state="open" />
// //         </div>
// //       </Modal>
// //     </>
// //   );
// // };

// const useReach = () => {
//   const [acc, setAcc] = useState<any>(null);
//   const [bkd, setBkd] = useState<any>(null);
//   const [ctc, setCtc] = useState<any>(null);

//   const setReach = (type: "account" | "backend" | "contract", payload: any) => {
//     const f = type === "account" ? setAcc : type === "backend" ? setBkd : setCtc;
//     f(payload);
//   };

//   return [
//     {
//       account: acc,
//       backend: bkd,
//       contract: ctc,
//     },
//     setReach,
//   ];
// };

// enum MODAL_ACTIONS {
//   MAKE_READY,
//   PROCEED_STEP,
//   SET_ACCOUNT,
//   SET_CONTRACT,
//   SET_BACKEND,
// }

// type ModalState = {
//   step: number;
//   ready: boolean;
//   timeout: boolean;
//   account: any;
//   contract: any;
//   backend: any;
// };

// function reducer(state: ModalState, action: { type: MODAL_ACTIONS; payload?: any }) {
//   console.log(state.step);
//   switch (action.type) {
//     case MODAL_ACTIONS.MAKE_READY:
//       return {
//         ...state,
//         ready: true,
//       };
//     case MODAL_ACTIONS.PROCEED_STEP:
//       return {
//         ...state,
//         step: state.step + 1,
//         ready: false,
//       };
//     default:
//       return state;
//   }
// }

// const initialState: ModalState = {
//   step: 0,
//   ready: false,
//   timeout: false,
//   account: null,
//   contract: null,
//   backend: null,
// };

// const Test = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const acceptResolveRef = useRef<any>();
//   const setAcceptResolveRef = (data: any) => {
//     acceptResolveRef.current = data;
//   };
//   const acceptPrice = () => acceptResolveRef.current(true);

//   return (
//     <>
//       <Modal>
//         <div style={{ minHeight: "40vh" }} className="overflow-y-auto flex flex-col">
//           <FormSwitcher state={state} dispatch={dispatch} />
//         </div>
//         <div style={{ minHeight: "10vh" }} className=" flex justify-around items-center">
//           {state.ready && (
//             <ProgressButton
//               txt="Next >"
//               state="open"
//               onClick={() => dispatch({ type: MODAL_ACTIONS.PROCEED_STEP })}
//             />
//           )}
//         </div>
//       </Modal>
//     </>
//   );
// };

// type FormSwitcherProps = {
//   state: ModalState;
//   dispatch: React.Dispatch<{ type: MODAL_ACTIONS; payload?: any }>;
// };
// const FormSwitcher = (props: FormSwitcherProps) => {
//   const makeReady = () => props.dispatch({ type: MODAL_ACTIONS.MAKE_READY });

//   switch (props.state.step) {
//     case 0:
//       return <ConnectWallet makeReady={makeReady} />;
//     case 1:
//       return <StartTransfer makeReady={makeReady} />;
//     default:
//       return <div />;
//   }
// };

// const ConnectWallet = ({ makeReady }: any) => {
//   const handleConnect = () => makeReady();

//   return (
//     <>
//       <ModalFormTitle title="Step 1: Connect Wallet" />
//       <div className="flex-grow flex flex-col items-center justify-center">
//         <div className="md:w-2/3">
//           <button
//             onClick={handleConnect}
//             className="syne text-lg text-center mb-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg p-3 w-full"
//           >
//             My Algo Wallet
//           </button>
//           <button
//             onClick={handleConnect}
//             className="syne text-lg text-center mb-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg p-3 w-full"
//           >
//             Wallet Connect
//           </button>
//           <button
//             onClick={handleConnect}
//             className="syne text-lg text-center mb-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg p-3 w-full"
//           >
//             Algo Signer
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// const StartTransfer = ({ makeReady }: any) => {
//   const startTransfer = () => makeReady();

//   return (
//     <>
//       <ModalFormTitle title="Step 2: Start the Transfer" />
//       <ModalFormAlert type="warning">
//         This is an experimental feature, your funds may be lost forever.
//       </ModalFormAlert>

//       <div className="flex-grow flex flex-col items-center justify-center">
//         <button
//           onClick={startTransfer}
//           className="px-5 py-4 shadow-lg rounded-lg bg-green-800 syne text-white"
//         >
//           I know the risks, start the transfer
//         </button>
//       </div>
//     </>
//   );
// };

// type ModalFormTextInputProps = {
//   st: any;
//   setSt: any;
//   label: string;
//   placeholder: string;
//   disabled?: boolean;
// };

// const ModalFormTextInput = (props: ModalFormTextInputProps) => {
//   return (
//     <div className="flex flex-col md:inline-flex md:flex-row md:w-full my-3">
//       <label
//         htmlFor={props.label + "-inp"}
//         className="text-center md:text-left syne self-center px-4 py-2 text-lg text-white"
//       >
//         {props.label}
//       </label>
//       <input
//         disabled={props.disabled ?? false}
//         id={props.label + "-inp"}
//         name={props.label + "-inp"}
//         type="text"
//         value={props.st}
//         onChange={(e) => props.setSt(e.target.value)}
//         placeholder={props.placeholder}
//         className="px-3 py-2 ml-3 mr-3 rounded-2xl shadow-md anaheim flex-grow"
//       />
//     </div>
//   );
// };

// type ModalFormCheckboxProps = {
//   st: any;
//   setSt: any;
//   label: string;
//   disabled?: boolean;
// };
// const ModalFormCheckbox = (props: ModalFormCheckboxProps) => {
//   const onClick = (_e: any) => {
//     if (!props.disabled) {
//       props.setSt(!props.st);
//     }
//   };

//   const bgColor = props.disabled ? "bg-gray-300" : "bg-white";
//   const labelStyle = "text-center md:text-left syne self-center px-4 py-2 text-lg text-white";
//   const checkStyle = "w-5 h-5 self-center rounded shadow-lg " + bgColor;

//   return (
//     <>
//       <label htmlFor={"check-inp"} className={labelStyle}>
//         {props.label}
//       </label>
//       <div onClick={onClick} className={checkStyle}>
//         {props.st && <span className="material-icons select-none relative text-sm">done</span>}
//       </div>
//     </>
//   );
// };

// type ModalFormPriceInputProps = {
//   st: any;
//   setSt: any;
//   label: string;
//   placeholder: string;
//   disabled?: boolean;
//   tokens?: boolean;
// };
// const ModalFormPriceInput = (props: ModalFormPriceInputProps) => {
//   const inputStyle =
//     "px-3 py-2 ml-3 mr-3 rounded-2xl shadow-md text-center anaheim flex-grow" +
//     (props.disabled ? " bg-gray-300" : "");

//   return (
//     <>
//       <div className="flex flex-col md:inline-flex md:flex-row md:w-full my-3">
//         <label
//           htmlFor={props.label + "-inp"}
//           className="text-center md:text-left syne self-center px-4 py-2 text-lg text-white"
//         >
//           {props.label}
//         </label>
//         <input
//           disabled={props.disabled ?? false}
//           id={props.label + "-inp"}
//           name={props.label + "-inp"}
//           type="number"
//           step="0.001"
//           value={props.st}
//           onChange={(e) => props.setSt(e.target.value)}
//           placeholder={props.placeholder}
//           className={inputStyle}
//         />
//         <p className="px-3 py-2 rounded-2xl syne text-white text-center">
//           {props.tokens ? "TOKENS" : "ALGO"}
//         </p>
//       </div>
//     </>
//   );
// };

// type ModalFormAlertProps = {
//   type: "success" | "alert" | "warning";
//   children: any;
// };
// const ModalFormAlert = (props: ModalFormAlertProps) => {
//   let alertColor;
//   switch (props.type) {
//     case "success":
//       alertColor = "bg-green-700";
//       break;
//     case "alert":
//       alertColor = "bg-red-700";
//       break;
//     case "warning":
//       alertColor = "bg-yellow-700";
//       break;
//     default:
//       alertColor = "bg-gray-800";
//       break;
//   }

//   const alertStyle = alertColor + " rounded-lg shadow-xl p-3 inline-flex w-full";

//   return (
//     <div className="mx-5 my-4">
//       <div className={alertStyle}>
//         <span className="material-icons text-white self-center">warning_amber</span>
//         <p className="syne text-white text-lg text-center flex-grow mx-4">{props.children}</p>
//       </div>
//     </div>
//   );
// };

// type ModalFormTitleProps = {
//   title: string;
// };
// const ModalFormTitle = (props: ModalFormTitleProps) => {
//   return <p className="text-5xl syne text-center mt-3 mb-6 shadow-sm text-white">{props.title}</p>;
// };

// export default Test;

export default function Test() {
  return <div />;
}
