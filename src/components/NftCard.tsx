import { CSSProperties, useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import { selectFrame } from "../assets/frames";
import { getStorageItem, setStorageItem } from "../lib/helpers";
import { NFT } from "../lib/nft";

import Spinner from "../assets/Spinner.svg";

type FileDimensions = {
  height: number;
  width: number;
};

// TODO: There's a double check of file type
const getDimensionsOf = async (url: string): Promise<FileDimensions> => {
  return await new Promise((resolve) => {
    const img = new Image();

    img.addEventListener("load", function () {
      const width = this.naturalWidth;
      const height = this.naturalHeight;
      resolve({ width, height });
    });

    img.addEventListener("error", function () {
      const video = document.createElement("video");
      video.addEventListener(
        "loadedmetadata",
        function () {
          const height = this.videoHeight;
          const width = this.videoWidth;
          resolve({ height, width });
        },
        false
      );
      video.addEventListener("error", function () {
        resolve({ height: 200, width: 200 });
      });
      video.src = url;
    });
    img.src = url;
  });
};

const setDiff = (a: Set<string>, b: Set<string>) => {
  let _difference = new Set(a);
  for (let elem of b) {
    _difference.delete(elem);
  }
  return _difference;
};

type NftCardProps = {
  nft: NFT;
  cardLength: number;
};
const NftCard = (props: NftCardProps) => {
  // Initialize tags with what's inside local storage
  const [tags, setTags] = useState<string[]>(
    getStorageItem("tags", "{}")?.[props.nft.assetId] ?? []
  );

  const [offset, setOffset] = useState<number>(0);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  const handleTagChange = (newTags: string[]) => {
    const oldSet = new Set(tags);
    const newSet = new Set(newTags);

    // eslint-disable-next-line eqeqeq
    if (oldSet == newSet) return;

    const localTags = getStorageItem("tags", "{}");
    const newItem = [...setDiff(newSet, oldSet)][0];

    if (!localTags["global"]) localTags["global"] = [];

    localTags[props.nft.assetId] = [...newSet];

    if (newItem && !localTags["global"].includes(newItem)) {
      localTags["global"].push(newItem);
    }

    setStorageItem("tags", localTags, {});
    setTags([...newSet]);
  };

  const [sizeRatio, setSizeRatio] = useState<number>(0);
  const imgUrl = props.nft.imgURL();

  useEffect(() => {
    async function getRatio() {
      const { height, width } = await getDimensionsOf(imgUrl);
      setSizeRatio(height / width);
    }

    getRatio();
  }, [imgUrl]);

  useEffect(() => {
    setOffset(3 + Math.random() * 9);
  }, [setOffset]);

  const { frame, ratio, innerPercentage } = selectFrame(sizeRatio);
  const frameStyle: CSSProperties = {
    height: props.cardLength * ratio + "px",
    margin: "10px",
    display: "flex",
    backgroundImage: `url(${frame})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${props.cardLength - 30}px ${props.cardLength * ratio}px`,
    justifyContent: "center",
    alignItems: "center",
  };

  return !loadFailed ? (
    <>
      <VerticalSpacer height={offset} />
      <div style={frameStyle}>
        <FallbackContent
          src={imgUrl}
          nested={false}
          setLoadFailed={setLoadFailed}
          extraStyle="syne"
          innerPercentage={innerPercentage}
        />
      </div>
      <div className="ml-10">
        <p className="syne text-4xl text-white mb-1">{props.nft.name}</p>
        <p className="anaheim text-xl text-white mb-3 font-semibold">
          Owner:{" "}
          {props.nft.owner.slice(0, 10) +
            "..." +
            props.nft.owner.slice(props.nft.owner.length - 6)}
        </p>
        <TagsInput value={tags} onChange={handleTagChange} />
      </div>
      <VerticalSpacer height={offset / 4} />
    </>
  ) : (
    <div />
  );
};

const VerticalSpacer = (props: { height: number }) => {
  return <div style={{ height: props.height + "em" }} />;
};

const FallbackContent = (props: {
  src: string;
  nested: boolean;
  setLoadFailed?: Function;
  extraStyle?: string;
  innerPercentage?: { w: number; h: number };
}) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [audioFailed] = useState<boolean>(false);

  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const contentStyle: CSSProperties = props.nested
    ? {
        transform: "translateX(4px)",
        color: "white",
        zIndex: -1,
      }
    : props.innerPercentage !== undefined
    ? {
        transform: "translateX(4px)",
        color: "white",
        width: props.innerPercentage.w + "%",
      }
    : {};

  const goFullscreen = () => {
    if (!props.nested) setFullscreen(true);
  };
  const closeFullscreen = () => setFullscreen(false);

  const handleErrorImage = () => {
    console.log("Image failed for", props.src);
    setImageFailed(true);
  };

  const handleErrorVideo = () => {
    console.log("Video failed for", props.src);
    setVideoFailed(true);

    if (props.setLoadFailed) props.setLoadFailed(true);
  };

  // TODO: For later
  // const handleErrorAudio = () => {
  //   console.log("Audio failed for", props.src);
  //   setAudioFailed(true);
  // };

  return (
    <>
      {audioFailed ? (
        <img src={Spinner} alt="Loading" />
      ) : videoFailed ? (
        <div>
          <img src={Spinner} alt="Loading" />
        </div>
      ) : imageFailed ? (
        props.nested ? (
          <video
            autoPlay={true}
            muted={false}
            className={props.extraStyle}
            src={props.src}
            style={contentStyle}
            onClick={goFullscreen}
            onError={(_e) => handleErrorVideo()}
          ></video>
        ) : (
          <video
            autoPlay={true}
            muted={true}
            loop={true}
            src={props.src}
            style={contentStyle}
            onClick={goFullscreen}
            onError={(_e) => handleErrorVideo()}
          ></video>
        )
      ) : (
        <img
          onClick={goFullscreen}
          style={contentStyle}
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

type ItemDisplayProps = {
  src: string;
  close: () => void;
};

const ItemDisplay = (props: ItemDisplayProps) => {
  return (
    <ItemDisplayModal outClick={props.close}>
      <FallbackContent src={props.src} extraStyle="h-full" nested={true} />
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
      bg-transparent
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

export default NftCard;
