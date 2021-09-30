import { useContext, useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import AppContext from "../context/appContext";
import { getAssetsOfAddress, getCollectionFromTokens, getDetailsOfAsset } from "../lib/algoHelpers";
import { NFT } from "../lib/nft";

import Loading from "../assets/Spinner.svg";
import GhostCard from "../components/GhostCard";
import { VIEWS } from "../constants";

const getStorageItem = (f: string, def: string) => {
  return JSON.parse(localStorage.getItem(f) ?? def);
};
const setStorageItem = (f: string, val: any, def: any) => {
  localStorage.setItem(f, JSON.stringify(val) ?? def);
};

const Library = () => {
  const appContext = useContext(AppContext);

  const [accs, setAccs] = useState<string[]>(getStorageItem("accounts", "[]"));

  const [getNfts, setGetNfts] = useState<boolean>(false);

  const [nfts, setNfts] = useState<NFT[]>([]);

  const [fetched, setFetched] = useState<boolean>(false);
  const [interrupt, setInterrupt] = useState<boolean>(false);

  const [expandFilter, setExpandFilter] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [accForm, setAccForm] = useState("");
  const handleAccForm = (e: any) => setAccForm(e.target.value);

  const switchSelectedTag = (tag: string) => {
    return !selectedTags.includes(tag)
      ? () => setSelectedTags((prevTags) => [...prevTags, tag])
      : () => setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const switchExpandFilter = () => {
    setExpandFilter(!expandFilter);
  };

  const addAccount = () => {
    // TODO: Check address if valid
    setAccs((prevAccs) => [...prevAccs, accForm]);

    const cacheAccounts: string[] = getStorageItem("accounts", "[]");
    setStorageItem("accounts", [...cacheAccounts, accForm], []);

    setAccForm("");
  };

  const removeAccount = (account: string) => {
    setInterrupt(true);
    setStorageItem("nfts", [], []);
    setNfts([]);
    setAccs((prevAccs) => prevAccs.filter((a) => a !== account));

    const cacheAccounts: string[] = getStorageItem("accounts", "[]");
    setStorageItem(
      "accounts",
      cacheAccounts.filter((a) => a !== account),
      []
    );
  };

  const goToStart = () => {
    appContext.set("view", VIEWS.START);
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

    const fetchAssets = async () => {
      let fetchedAssets: any[] = [];
      for (let i = 0; i < accs.length; i++) {
        fetchedAssets = [...fetchedAssets, ...(await getAssetsOfAddress(accs[i]))];
      }
      return fetchedAssets;
    };

    const fetchNfts = async (arr: any[]) => {
      if (arr.length === 0) {
        setFetched(true);
        return;
      }

      setNfts([]);

      let fetchedNfts: NFT[] = [];
      for (let i = 0; i < arr.length; i++) {
        if (interrupt) break;

        const asset = arr[i];
        const fetchedNft = await getDetailsOfAsset(asset);

        setNfts((prevState) => {
          return [...prevState, fetchedNft];
        });
        fetchedNfts = [...fetchedNfts, fetchedNft];
      }

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
      // setNfts((prevState) => [...prevState, ...fetchedNfts]);
    };

    setFetched(false);
    getCachedNFTs()
      .then(() => fetchAssets())
      .then((assets) => fetchNfts(assets));

    if (interrupt) {
      setNfts([]);
      setStorageItem("nfts", [], []);
      setFetched(true);
      setInterrupt(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interrupt, accs]);

  return (
    <div className="h-full w-screen" style={{ backgroundColor: "#171717" }}>
      <span className="py-10 pl-10 inline-flex w-full">
        <button onClick={goToStart}>
          <span className="material-icons transform scale-150 align-middle mr-4 text-white">
            chevron_left
          </span>
        </button>
        <h1 className="syne text-5xl font-bold text-white">Your Collection</h1>
        <div className="ml-auto flex flex-row">
          <div className="px-4 ">
            {accs.map((acc: string) => (
              <button
                onClick={() => removeAccount(acc)}
                className="bg-indigo-700 text-white anaheim text-md rounded px-3 py-1 ml-2 hover:bg-red-600 transition-colors ease-in"
              >
                {acc.slice(0, 5) + "..." + acc.slice(48)}
              </button>
            ))}
          </div>
          <input
            className="w-15 pl-5 py-3 rounded-l-lg bg-white placeholder-gray-700 anaheim"
            placeholder="Add Wallet"
            value={accForm}
            onChange={handleAccForm}
          />
          <button
            onClick={addAccount}
            className="bg-indigo-700 rounded-r-lg py-3 px-3 mr-14 text-xl font-bol"
          >
            <span className="material-icons text-white align-middle">add</span>
          </button>
        </div>
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

      {filteredNfts.length === 0 && fetched && (
        <h2 className="mt-16 sm:mx-4 md:mx-16 lg:mx-32 syne text-5xl text-white">
          {accs.length > 0 ? "No Items" : "Add addresses to browse"}
        </h2>
      )}

      <div className="sm:mx-4 md:mx-16 lg:mx-32 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-16">
        <div className="flex flex-col">
          {filteredNfts.map((nft, i) => i % 3 === 0 && <ItemCard key={nft.assetId} nft={nft} />)}
          {!fetched && <GhostCard h="40" />}
        </div>
        <div className="flex flex-col">
          {filteredNfts.map((nft, i) => i % 3 === 1 && <ItemCard key={nft.assetId} nft={nft} />)}
          {!fetched && <GhostCard h="50" />}
        </div>
        <div className="flex flex-col">
          {filteredNfts.map((nft, i) => i % 3 === 2 && <ItemCard key={nft.assetId} nft={nft} />)}
          {!fetched && <GhostCard h="45" />}
        </div>
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
        transition: "max-height 1s",
        backgroundColor: "red",
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
          ? "syne mr-3 rounded-lg px-3 py-1 text-white bg-gray-800"
          : "syne mr-3 rounded-lg px-3 py-1 text-white bg-indigo-700"
      }
    >
      {props.tag}
    </button>
  );
};

export default Library;
