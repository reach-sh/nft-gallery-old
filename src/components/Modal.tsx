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
            w-10/12
            sm:w-9/12
            md:w-8/12
            lg:w-7/12 
            xl:w-5/12 
            
            bg-indigo-800
            rounded-xl 
            self-center
            shadow-xl
            
            p-4 
            flex flex-col 
            justify-center 
            overflow-y-auto
            overflow-x-hidden"
        style={{ maxHeight: "70vh" }}
        onClick={stopBubble}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
