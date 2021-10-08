import FallbackImage from "./FallbackImage";
import Modal from "./Modal";
// TODO: Use different modal

type ItemDisplayProps = {
  src: string;
  close: () => void;
};

const ItemDisplay = (props: ItemDisplayProps) => {
  return (
    <Modal outClick={props.close}>
      <div style={{ height: "70vw" }}>
        <FallbackImage src={props.src} extraStyle="h-full" nested={true} />
      </div>
    </Modal>
  );
};

export default ItemDisplay;
