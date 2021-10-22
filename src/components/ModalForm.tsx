type ModalFormTextInputProps = {
  st: any;
  setSt: any;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
};

export const ModalFormTextInput = (props: ModalFormTextInputProps) => {
  return (
    <div className="flex flex-col md:inline-flex md:flex-row md:w-full my-3">
      <label
        htmlFor={props.label + "-inp"}
        className="text-center md:text-left syne self-center px-4 py-2 text-lg text-white"
      >
        {props.label}
      </label>
      <input
        disabled={props.disabled ?? false}
        id={props.label + "-inp"}
        name={props.label + "-inp"}
        type={props.type ?? "text"}
        value={props.st}
        onChange={(e) => props.setSt(e.target.value)}
        placeholder={props.placeholder}
        className="px-3 py-2 ml-3 mr-3 rounded-2xl shadow-md anaheim flex-grow"
      />
    </div>
  );
};

type ModalFormCheckboxProps = {
  st: any;
  setSt: any;
  label: string;
  disabled?: boolean;
};

export const ModalFormCheckbox = (props: ModalFormCheckboxProps) => {
  const onClick = (_e: any) => {
    console.log("onClick");
    if (!props.disabled) {
      props.setSt(!props.st);
    }
  };

  const bgColor = props.disabled ? "bg-gray-300" : "bg-white";
  const labelStyle = "text-center md:text-left syne self-center px-4 py-2 text-lg text-white";
  const checkStyle = "w-5 h-5 self-center rounded shadow-lg " + bgColor;

  return (
    <>
      <label htmlFor={"check-inp"} className={labelStyle}>
        {props.label}
      </label>
      <div onClick={onClick} className={checkStyle}>
        {props.st && <span className="material-icons select-none relative text-sm">done</span>}
      </div>
    </>
  );
};

type ModalFormPriceInputProps = {
  st: any;
  setSt: any;
  label: string;
  placeholder: string;
  disabled?: boolean;
  tokens?: boolean;
};

export const ModalFormPriceInput = (props: ModalFormPriceInputProps) => {
  const inputStyle =
    "px-3 py-2 ml-3 mr-3 rounded-2xl shadow-md text-center anaheim flex-grow" +
    (props.disabled ? " bg-gray-300" : "");

  return (
    <>
      <div className="flex flex-col md:inline-flex md:flex-row md:w-full my-3">
        <label
          htmlFor={props.label + "-inp"}
          className="text-center md:text-left syne self-center px-4 py-2 text-lg text-white"
        >
          {props.label}
        </label>
        <input
          disabled={props.disabled ?? false}
          id={props.label + "-inp"}
          name={props.label + "-inp"}
          type="number"
          step="0.001"
          value={props.st}
          onChange={(e) => props.setSt(e.target.value)}
          placeholder={props.placeholder}
          className={inputStyle}
        />
        <p className="px-3 py-2 rounded-2xl syne text-white text-center">
          {props.tokens ? "TOKENS" : "ALGO"}
        </p>
      </div>
    </>
  );
};

type ModalFormAlertProps = {
  type: "success" | "alert" | "warning" | "info";
  children: any;
};

export const ModalFormAlert = (props: ModalFormAlertProps) => {
  let alertColor;
  switch (props.type) {
    case "success":
      alertColor = "bg-green-700";
      break;
    case "alert":
      alertColor = "bg-red-700";
      break;
    case "warning":
      alertColor = "bg-yellow-700";
      break;
    case "info":
      alertColor = "bg-blue-500";
      break;
    default:
      alertColor = "bg-gray-800";
      break;
  }

  const alertStyle = alertColor + " rounded-lg shadow-xl p-3 inline-flex w-full";

  return (
    <div className="mx-5 my-4">
      <div className={alertStyle}>
        <span className="material-icons text-white self-center">
          {props.type === "info" ? "info_outline" : "warning_amber"}
        </span>
        <p className="syne text-white text-lg text-center flex-grow mx-4">{props.children}</p>
      </div>
    </div>
  );
};

type ModalFormTitleProps = {
  title: string;
};

export const ModalFormTitle = (props: ModalFormTitleProps) => {
  return <p className="text-5xl syne text-center mt-3 mb-6 shadow-sm text-white">{props.title}</p>;
};

type ModalFormProgressButtonProps = {
  state: "open" | "closed" | "restricted";
  txt: string;
  onClick: any;
};

export const ModalFormProgressButton = (props: ModalFormProgressButtonProps) => {
  const stateColor =
    props.state === "open"
      ? "bg-green-800"
      : props.state === "closed"
      ? "bg-gray-800"
      : props.state === "restricted"
      ? "bg-red-800"
      : "bg-indigo-800";

  return (
    <button
      className={"shadow-lg rounded-2xl py-4 px-5 h-full syne text-white " + stateColor}
      onClick={props.onClick}
    >
      {props.txt}
    </button>
  );
};
