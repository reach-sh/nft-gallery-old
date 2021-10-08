type StepProps = {
  children: any;
  active: boolean;
};
export const Step = (props: StepProps) => {
  return (
    <div
      className={
        "self-center mx-4 my-3 px-5 py-2 w-full flex flex-col rounded-lg bg-gray-800 " +
        (props.active ? "text-white" : "text-gray-600")
      }
    >
      {props.children}
    </div>
  );
};

type StepButtonProps = {
  txt: string;
  disabled: boolean;
  fn: () => void;
};

export const StepButton = (props: StepButtonProps) => {
  return !props.disabled ? (
    <button
      disabled={false}
      className="bg-indigo-700 hover:bg-indigo-600 text-white syne rounded my-1 px-3 py-2 ml-3"
      onClick={props.fn}
    >
      {props.txt}
    </button>
  ) : (
    <button disabled={true} className="bg-indigo-200 text-black syne rounded my-1 px-3 py-2 ml-3">
      {props.txt}
    </button>
  );
};

type StepTitleProps = {
  txt: string;
  extraStyle?: string;
};
export const StepTitle = (props: StepTitleProps) => {
  return <p className={"anaheim text-lg font-bold " + (props.extraStyle ?? "")}>{props.txt}</p>;
};
