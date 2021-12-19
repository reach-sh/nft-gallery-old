import { useState, useEffect, useRef } from "react";
import {
  getAssetIdsOfAddress,
  getNFTIterator,
  NFTIterator,
} from "./lib/algoHelpers";
import { NFT } from "./lib/nft";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

type UseNftDefaults = {
  accs: string[];
};
export function useNfts(defs: UseNftDefaults) {
  const [accs, setAccs] = useState<string[]>(defs.accs);
  const [update, setUpdate] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);
  const [nftIterator, setNftIterator] = useState<NFTIterator | undefined>(
    undefined
  );

  const [nfts, _setNfts] = useState<NFT[]>([]);
  const nftsRef = useRef<NFT[]>(nfts);
  const setNfts = (data: NFT[]) => {
    nftsRef.current = data;
    _setNfts(data);
  };

  const handleScroll = (e: any) => {
    const scrollHeight = window.innerHeight + window.scrollY;
    if (scrollHeight >= document.body.offsetHeight && !nftIterator?.isDone()) {
      setDone(false);
      setUpdate(true);
    }
  };

  useEffect(() => {
    const loadIterator = async () => {
      const ownerAsaIds = [];
      for (let account of accs)
        ownerAsaIds.push(await getAssetIdsOfAddress(account));

      const nftIter = getNFTIterator(ownerAsaIds, 5);
      setNftIterator(nftIter);
    };

    loadIterator();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accs, setNftIterator]);

  useEffect(() => {
    const updateNfts = async () => {
      setDone(false);
      setNfts([...nftsRef.current, ...(await nftIterator!.next())]);

      setDone(true);
      setUpdate(false);
    };

    if (nftIterator && update) {
      updateNfts();
    }
  }, [update, nftIterator]);

  return { accs, setAccs, done, nftIterator, nftsRef };
}

export const useScroll = () => {
  const scrollSpeed = useRef<number>();

  var checkScrollSpeed = (function () {
    var lastPos: number | null,
      newPos: number,
      timer: NodeJS.Timeout,
      delta: number,
      delay = 50; // in "ms" (higher means lower fidelity )

    function clear() {
      lastPos = null;
      delta = 0;
    }

    clear();

    return function () {
      newPos = window.scrollY;
      if (lastPos != null) {
        // && newPos < maxScroll
        delta = newPos - lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
  })();

  // listen to "scroll" event
  window.onscroll = function () {
    scrollSpeed.current = checkScrollSpeed();
  };

  return { scrollSpeed: scrollSpeed.current };
};
