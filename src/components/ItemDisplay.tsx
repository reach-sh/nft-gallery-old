import FallbackImage from "./FallbackImage";
// TODO: Use different modal

type ItemDisplayProps = {
  src: string;
  close: () => void;
};

const ItemDisplay = (props: ItemDisplayProps) => {
  return (
    <ItemDisplayModal outClick={props.close}>
      <FallbackImage src={props.src} extraStyle="h-full" nested={true} />
    </ItemDisplayModal>
  );
};

const ItemDisplayModal = (props: any) => {
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
      bg-indigo-800
        shadow-lg
        self-center
        flex flex-col justify-center overflow-x-hidden"
        style={{ zIndex: -1, height: "80%" }}
        onClick={stopBubble}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ItemDisplay;
