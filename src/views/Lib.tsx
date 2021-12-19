import ReachLogo from "../assets/Reach.svg";

import { useContext, useState } from "react";
import { VIEWS } from "../constants";

import AppContext from "../context/appContext";
import Masonry from "react-masonry-css";
import { useNfts, useScroll, useWindowDimensions } from "../utils";
import { getStorageItem } from "../lib/helpers";

import AddressModal from "../components/AddressModal";
import NftCard from "../components/NftCard";

const Library = () => {
  const appContext = useContext(AppContext);

  const [showAddrModal, setShowAddrModal] = useState<boolean>(true);

  const { scrollSpeed } = useScroll();
  const { accs, setAccs, done, nftIterator, nftsRef } = useNfts({
    accs: ["N42L7IIGQGZA7OGNLGQXZWBUZHQYH5HJVU3M6625KGOMHWFFOFPAID22VA"],
    // accs: getStorageItem("accounts", "[]"),
  });
  const { width } = useWindowDimensions();
  const colCount = width < 800 ? 1 : width < 1200 ? 2 : 3;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const switchSelectedTag = (tag: string) => {
    return !selectedTags.includes(tag)
      ? () => setSelectedTags((prevTags) => [...prevTags, tag])
      : () => setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const willItemRender = (assetId: number) => {
    const itemTags = getStorageItem("tags", "[]")?.[assetId];
    if (!itemTags) return true;

    return selectedTags.reduce(
      (prev, val) => prev || itemTags.includes(val),
      false
    );
  };

  const goToStart = () => {
    appContext.set("view", VIEWS.START);
  };

  return (
    <div
      className="h-full w-screen overflow-y-scroll"
      style={{ backgroundColor: "#171717" }}
    >
      <LibraryTopBar
        goToStart={goToStart}
        showAddrModal={() => {
          setShowAddrModal(true);
        }}
      />

      <Masonry
        breakpointCols={colCount}
        className="flex mt-10"
        columnClassName="mx-2 my-4"
      >
        {nftsRef.current
          .filter((el) => willItemRender(el.assetId))
          .map((el) => (
            <>
              <NftCard
                cardLength={width / colCount}
                nft={el}
                key={el.assetId}
              />
              {/* <Spacer factor={Math.abs(scrollSpeed ?? 0) / 500} /> */}
            </>
          ))}
      </Masonry>

      {showAddrModal && (
        <AddressModal
          addresses={accs}
          setAddresses={setAccs}
          outClick={() => {
            setShowAddrModal(false);
          }}
        />
      )}
    </div>
  );
};

type SpacerProps = {
  factor: number;
};
const Spacer = (props: SpacerProps) => {
  const height = 100 + 400 * props.factor;

  return <div style={{ height: height + "px" }} />;
};

type LibraryTopBarProps = {
  goToStart: () => void;
  showAddrModal: any;
};
const LibraryTopBar = (props: LibraryTopBarProps) => {
  return (
    <span className="py-16 pl-16 flex flex-col text-center md:inline-flex md:flex-row gap-3 md:gap-0 w-full justify-between">
      <div className="flex justify-evenly">
        {/* <button onClick={props.goToStart}>
          <span className="material-icons transform scale-150 align-middle mr-4 text-white">
            chevron_left
          </span>
        </button> */}

        <h1 className="syne self-center text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-white">
          Your Collection
        </h1>

        <button
          className="p-3 self-center md:ml-8"
          onClick={() => {
            localStorage.removeItem("nfts");
            localStorage.removeItem("accounts");
            localStorage.removeItem("mds");
          }}
        >
          <span className="text-white material-icons font-sm">filter_list</span>
        </button>
      </div>

      <div className="mr-20">
        <button
          onClick={props.showAddrModal}
          className="inline syne mr-8 bg-indigo-400 hover:bg-indigo-500 
          transition-colors bg-opacity-60 px-3 py-2 rounded-sm text-white"
        >
          Manage addresses
        </button>
        <img className="inline" width={75} src={ReachLogo} alt="Reach logo" />
      </div>
    </span>
  );
};

export default Library;
