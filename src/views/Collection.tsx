import ReachLogo from "../assets/Reach.svg";

import { useContext, useState } from "react";
import { VIEWS } from "../constants";

import AppContext from "../context/appContext";
import Masonry from "react-masonry-css";
import { useWindowDimensions } from "../utils";
import { getStorageItem } from "../lib/helpers";
import { useNfts } from "../hooks";

import AddressModal from "../components/AddressModal";
import NftCard from "../components/NftCard";

const Collection = () => {
  const appContext = useContext(AppContext);

  const [showAddrModal, setShowAddrModal] = useState<boolean>(
    getStorageItem("accounts", "[]").length === 0
  );

  const { accs, setAccs, nftsRef, done } = useNfts({
    // accs: ["N42L7IIGQGZA7OGNLGQXZWBUZHQYH5HJVU3M6625KGOMHWFFOFPAID22VA"],
    accs: getStorageItem("accounts", "[]"),
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
    if (selectedTags.length === 0) return true;
    if (!itemTags) return false;

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
        swSelectedTag={switchSelectedTag}
        selectedTags={selectedTags}
      />

      <Masonry
        breakpointCols={colCount}
        className="flex mt-10"
        columnClassName="mx-2 my-4"
      >
        {nftsRef.current.length > 0 ? (
          nftsRef.current.map((el) => {
            return willItemRender(el.assetId) ? (
              <>
                <NftCard
                  cardLength={width / colCount}
                  nft={el}
                  key={el.assetId}
                />
              </>
            ) : (
              <div></div>
            );
          })
        ) : done ? (
          <p
            className="absolute text-white anaheim text-3xl text-center font-semibold"
            style={{ left: "46%" }}
          >
            Nothing to show
          </p>
        ) : (
          <div />
        )}
      </Masonry>

      {!done && (
        <p className="text-white text-center text-3xl mb-12 anaheim anim-blink">
          Loading
        </p>
      )}

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

type LibraryTopBarProps = {
  goToStart: () => void;
  swSelectedTag: (tag: string) => () => void;
  selectedTags: string[];
  showAddrModal: any;
};
const LibraryTopBar = (props: LibraryTopBarProps) => {
  const [showTags, setShowTags] = useState<boolean>(false);

  return (
    <>
      <span className="py-16 pl-16 flex flex-col text-center md:inline-flex md:flex-row gap-3 md:gap-0 w-full justify-between">
        <div className="flex justify-evenly">
          <h1 className="syne self-center text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-white">
            Your Collection
          </h1>

          <button
            className="p-3 self-center md:ml-8"
            onClick={() => setShowTags((t) => !t)}
          >
            <span className="text-white material-icons font-sm">
              filter_list
            </span>
          </button>
        </div>

        <div className="mr-20">
          <button
            onClick={props.showAddrModal}
            className="inline syne mr-16 bg-indigo-500 hover:bg-indigo-400
          transition-colors bg-opacity-60 px-3 py-2 text-white"
          >
            Manage addresses
          </button>
          <img className="inline" width={75} src={ReachLogo} alt="Reach logo" />
        </div>
      </span>

      {showTags && (
        <FilterTags
          swSelectedTag={props.swSelectedTag}
          selectedTags={props.selectedTags}
        />
      )}
    </>
  );
};

type FilterTabProps = {
  selectedTags: string[];
  swSelectedTag: (tag: string) => () => void;
};
const FilterTags = (props: FilterTabProps) => {
  const allTags = getStorageItem("tags", "{}");

  const doesTagExist = (tag: string) => {
    return Object.keys(allTags).reduce((prev, id) => {
      if (id === "global") return prev;
      if (!allTags?.[id]) return prev;
      return prev || allTags[id].includes(tag);
    }, false);
  };

  const getGlobalTags = () => {
    const globalTags = allTags?.["global"] ?? [];
    return globalTags.filter(doesTagExist);
  };

  const fltGlobalTags = getGlobalTags();

  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <div className="py-3 bg-white flex flex-col ">
        <div className="mx-40">
          <h2 className="my-3 text-3xl font-semibold anaheim">Filter By Tag</h2>
          <div className="py-1 mb-2 flex flex-row">
            {fltGlobalTags.length > 0 ? (
              fltGlobalTags.map((tag: string) => (
                <TagChip
                  key={tag}
                  selected={props.selectedTags.includes(tag)}
                  fn={props.swSelectedTag(tag)}
                  tag={tag}
                />
              ))
            ) : (
              <p className="anaheim text-xl font-medium">No Tags</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TagChip = (props: { selected: boolean; tag: string; fn: () => void }) => {
  return (
    <button
      onClick={props.fn}
      className={
        props.selected
          ? "syne mr-3 px-3 py-1 text-white bg-gray-800"
          : "syne mr-3 px-3 py-1 text-white bg-indigo-700 hover:bg-indigo-600"
      }
    >
      {props.tag}
    </button>
  );
};

export default Collection;
