import { useState } from "react";
import ItemDisplay from "./ItemDisplay";
import ReactPlayer from "react-player";

type FallbackImageProps = {
  src: string;
  extraStyle: string;
  nested?: boolean;
};
const FallbackImage = (props: FallbackImageProps) => {
  const [failed, setFailed] = useState<boolean>(false);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const goFullscreen = () => {
    if (!props.nested) setFullscreen(true);
  };
  const closeFullscreen = () => setFullscreen(false);

  const handleErrorImage = () => {
    setFailed(true);
  };

  const handleErrorVideo = () => {
    setVideoFailed(true);
  };

  return (
    <>
      {videoFailed ? (
        <p onClick={goFullscreen} className="syne text-2xl p-5 align-middle text-center">
          {props.src}
        </p>
      ) : failed ? (
        <div>
          onClick={goFullscreen}
          className={props.extraStyle}
          <ReactPlayer playing={false} onError={(_e) => handleErrorVideo()} src={props.src} />
        </div>
      ) : (
        <img
          onClick={goFullscreen}
          className={props.extraStyle}
          src={props.src}
          alt=""
          onError={(_e) => handleErrorImage()}
        />
      )}

      {fullscreen && <ItemDisplay src={props.src} close={closeFullscreen} />}
    </>
  );
};

export default FallbackImage;
