import { CSSProperties, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import TagsInput from "react-tagsinput";
import { selectFrame } from "../assets/frames";
import { getStorageItem, setStorageItem } from "../lib/helpers";
import { NFT } from "../lib/nft";

type FileDimensions = {
  height: number;
  width: number;
};

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
  // tags: string[];
};
const NftCard = (props: NftCardProps) => {
  // Initialize tags with what's inside local storage
  const [tags, setTags] = useState<string[]>(
    getStorageItem("tags", "{}")?.[props.nft.assetId] ?? []
  );

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

  const [loadError, setLoadError] = useState<boolean>(false);
  const [sizeRatio, setSizeRatio] = useState<number>(0);
  const imgUrl = props.nft.imgURL();

  useEffect(() => {
    async function getRatio() {
      const { height, width } = await getDimensionsOf(imgUrl);
      setSizeRatio(height / width);
    }

    getRatio();
  }, [imgUrl]);

  const { frame, ratio, innerPercentage } = selectFrame(sizeRatio);

  return (
    <>
      <VerticalSpacer height={20 + Math.random() * 200} />
      <div
        style={{
          height: props.cardLength * ratio + "px",
          margin: "10px",
          display: "flex",
          backgroundImage: `url(${frame})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${props.cardLength - 30}px ${
            props.cardLength * ratio
          }px`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FallbackContent
          src={imgUrl}
          nested={false}
          extraStyle="syne"
          innerPercentage={innerPercentage}
        />
      </div>
      <p className="syne text-4xl text-white ml-3 mb-4">{props.nft.name}</p>
      <TagsInput value={tags} onChange={handleTagChange} />
      <VerticalSpacer height={Math.random() * 400} />
    </>
  );
};

const VerticalSpacer = (props: { height: number }) => {
  return <div style={{ height: props.height + "px" }} />;
};

const FallbackContent = (props: {
  src: string;
  nested: boolean;
  extraStyle?: string;
  innerPercentage?: { w: number; h: number };
}) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [audioFailed, setAudioFailed] = useState<boolean>(false);

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
        // position: "relative",
        width: props.innerPercentage.w + "%",
        // height: props.innerPercentage.h + "%",
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
  };

  const handleErrorAudio = () => {
    console.log("Audio failed for", props.src);
    setAudioFailed(true);
  };

  return (
    <>
      {audioFailed ? (
        <div onClick={goFullscreen}>{props.src}</div>
      ) : videoFailed ? (
        <div>
          <audio
            style={contentStyle}
            src={props.src}
            onError={(_e) => handleErrorAudio}
          />
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