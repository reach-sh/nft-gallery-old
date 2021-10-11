const Modal = (props: any) => {
  const stopBubble = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={props.outClick}
      className="fixed left-0 top-0 w-screen h-screen grid justify-items-center bg-black bg-opacity-70"
    >
      <div
        className="
        rounded-xl 
        w-5/6
        sm:w-2/3
        md:w-1/2 
        xl:w-1/3 p-4 
      bg-indigo-800
        shadow-lg
        z-10
        self-center
        flex flex-col justify-center overflow-x-hidden"
        style={{ maxHeight: "70vw" }}
        onClick={stopBubble}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
