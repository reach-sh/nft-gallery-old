import { useContext, useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import AppContext from "../context/appContext";
import { getCollection, getCollectionFromTokens } from "../lib/algoHelpers";
import { NFT } from "../lib/nft";

import Loading from "../assets/Spinner.svg";
import GhostCard from "../components/GhostCard";

const Library = () => {
  const appContext = useContext(AppContext);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const [expandFilter, setExpandFilter] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const switchSelectedTag = (tag: string) => {
    return !selectedTags.includes(tag)
      ? () => setSelectedTags((prevTags) => [...prevTags, tag])
      : () => setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const switchExpandFilter = () => {
    setExpandFilter(!expandFilter);
  };

  const filterNfts = (): NFT[] => {
    const idToTag = JSON.parse(localStorage.getItem("tags") ?? "{}");
    return nfts.filter((nft: NFT) => {
      return selectedTags.reduce(
        (prev, tag) => prev && idToTag?.[nft.assetId] && idToTag[nft.assetId].includes(tag),
        true
      );
    });
  };

  const filteredNfts = filterNfts();

  useEffect(() => {
    const getCachedNFTs = async () => {
      const cachedNfts = JSON.parse(localStorage.getItem("nfts") ?? "[]");
      if (cachedNfts.length === 0) return;

      setNfts(await getCollectionFromTokens(cachedNfts));
    };

    const fetchNFTs = async () => {
      const addrs = appContext.settings.addresses;
      let fetchedNfts: NFT[] = [];
      for (let i = 0; i < addrs.length; i++) {
        fetchedNfts = [...fetchedNfts, ...(await getCollection(addrs[i]))];
      }
      setNfts(fetchedNfts);

      const cacheMd = fetchedNfts.map((n: NFT) => ({
        [n.assetId]: {
          name: n.name,
          url: n.url,
          creator: n.creator,
          manager: n.owner,
          total: n.count,
        },
      }));
      localStorage.setItem("nfts", JSON.stringify(cacheMd));
      setFetched(true);
    };

    if (!fetched) {
      getCachedNFTs().then(() => fetchNFTs());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-screen" style={{ backgroundColor: "#171717" }}>
      <span className="py-10 pl-10 inline-flex">
        <button onClick={() => window.location.reload()}>
          <span className="material-icons transform scale-150 align-middle mr-4 text-white">
            chevron_left
          </span>
        </button>
        <h1 className="syne text-5xl font-bold text-white">Your Collection</h1>
      </span>
      <hr className="text-white" />

      <FilterTab
        show={expandFilter}
        selectedTags={selectedTags}
        swSelectedTag={switchSelectedTag}
      />

      <button className="bg-transparent" onClick={switchExpandFilter}>
        <span className="absolute mb-20 right-20 text-white transform scale-150 material-icons">
          filter_list
        </span>
      </button>

      <div className="sm:mx-4 md:mx-16 lg:mx-32 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-16">
        {filteredNfts.length > 0 ? (
          filteredNfts.map((nft) => <ItemCard key={nft.assetId} nft={nft} />)
        ) : !fetched ? (
          <>
            <GhostCard h="40" />
            <GhostCard h="50" />
            <GhostCard h="45" />
          </>
        ) : (
          <h2 className="syne text-5xl text-white">No Items</h2>
        )}
      </div>

      {!fetched && (
        <div className="fixed right-10 bottom-10 py-3 px-5 inline-flex items-center rounded-md text-center text-white bg-indigo-700">
          <img src={Loading} alt="" className="h-10" />
          <p className="syne">Fetching Latest Items</p>
        </div>
      )}
    </div>
  );
};

type FilterTabProps = {
  show: boolean;
  selectedTags: string[];
  swSelectedTag: (tag: string) => () => void;
};

const FilterTab = (props: FilterTabProps) => {
  const doesTagExist = (tag: string) => {
    const allTags = JSON.parse(localStorage.getItem("tags") ?? "{}");
    return Object.keys(allTags).reduce((prev, id) => {
      if (id === "global") return prev;
      if (!allTags?.[id]) return prev;
      return prev || allTags[id].includes(tag);
    }, false);
  };

  const getGlobalTags = () => {
    const globalTags = JSON.parse(localStorage.getItem("tags") ?? "{}")?.["global"] ?? [];
    return globalTags.filter(doesTagExist);
  };

  const fltGlobalTags = getGlobalTags();

  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: props.show ? "500px" : "0",
        transition: "max-height 1s ease-out",
      }}
    >
      <div className="py-3 bg-white flex flex-col ">
        <div className="mx-40">
          <h2 className="my-3 text-3xl font-semibold">Filter By Tag</h2>
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
          ? "syne mr-3 rounded-lg px-3 py-1 text-white bg-gray-800"
          : "syne mr-3 rounded-lg px-3 py-1 text-white bg-indigo-700"
      }
    >
      {props.tag}
    </button>
  );
};

export default Library;
