const Modal = (props: any) => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen grid justify-items-center bg-black bg-opacity-70">
      <div
        className="
        rounded-xl 
        w-5/6
        sm:w-2/3
        md:w-1/2 
        xl:w-1/3 p-4 
      bg-indigo-800
        shadow-lg
        self-center
        flex flex-col justify-center overflow-hidden"
        style={{ zIndex: -1 }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
