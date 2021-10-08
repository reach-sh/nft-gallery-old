import { useState } from "react";

type FallbackImageProps = {
  src: string;
  extraStyle: string;
};
const FallbackImage = (props: FallbackImageProps) => {
  const [failed, setFailed] = useState<boolean>(false);

  const [videoFailed, setVideoFailed] = useState<boolean>(false);

  const handleErrorImage = () => {
    setFailed(true);
  };

  const handleErrorVideo = () => {
    setVideoFailed(true);
  };

  return videoFailed ? (
    <p className="syne text-2xl py-5 align-middle text-center">{props.src}</p>
  ) : failed ? (
    <video className={props.extraStyle} src={props.src} onError={(_e) => handleErrorVideo()} />
  ) : (
    <img className={props.extraStyle} src={props.src} alt="" onError={(_e) => handleErrorImage()} />
  );
};

export default FallbackImage;
